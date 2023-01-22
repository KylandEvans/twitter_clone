if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const engine = require("ejs-mate");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");
var mysql2 = require("mysql2/promise");
const MySQLStore = require("express-mysql-session")(session);

const sessionStoreOptions = {
	host: "localhost",
	port: 3306,
	user: "root",
	password: process.env.dbPass,
	database: "twitter_clone",
};

const connection = mysql2.createPool(sessionStoreOptions);
const sessionStore = new MySQLStore(sessionStoreOptions, connection);

const sessionOptions = {
	secret: "secret",
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
};

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: process.env.dbPass,
	database: "twitter_clone",
});

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);
app.use(flash());
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	db.query(`SELECT * FROM users	WHERE id = ${id}`, (err, results, fields) => {
		if (err) return done(err);
		return done(null, results[0]);
	});
});

function validateNewUserData(data) {
	if (!data.name) {
		return true;
	}
	if (!data.phone && !data.email) {
		return true;
	}
	if (data.phone && data.email) {
		return true;
	}
	if (!data.password) {
		return true;
	}
}

passport.use(
	new LocalStrategy((username, password, done) => {
		db.query(
			`SELECT * FROM users WHERE email = ${JSON.stringify(username)} OR phone = ${JSON.stringify(
				username
			)};`,
			async (err, results, fields) => {
				if (!results[0].id) {
					return done(null, false, { message: "User does not exist" });
				}
				try {
					if (await bcrypt.compare(JSON.stringify(password), results[0].password)) {
						return done(null, results[0]);
					} else {
						return done(null, false, { message: "Password incorrect" });
					}
				} catch {
					return done(e);
				}
			}
		);
	})
);

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/");
}

function checkNotAuthenticated(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

app.get("/", (req, res) => {
	if (req.user) {
		res.render("index_feed", { user: req.user });
	} else {
		res.render("index_login");
	}
});

app.post("/signup", async (req, res, next) => {
	const data = req.body;
	if (validateNewUserData(data)) {
		currUser = null;
		return res.redirect("/");
	}
	const hashedpw = await bcrypt.hash(JSON.stringify(data.password), 10);

	const newDOB = new Date(data.DOB).toISOString().split("T")[0];
	db.query(
		`INSERT INTO users (name, phone, email, dob, track, password)
		 VALUES (
			${JSON.stringify(data.name)}, 
			${JSON.stringify(data.phone)}, 
			${JSON.stringify(data.email)}, 
			${JSON.stringify(newDOB)},
			${JSON.stringify(data.track)}, 
			${JSON.stringify(hashedpw)}
			);
		`,
		(err, results, fields) => {
			if (err) throw err;
			if (results.insertId) {
				// currUser = results.insertId;
				db.query(
					`SELECT * FROM users WHERE id = ${results.insertId}`,
					(err, results, fields) => {
						if (err) return res.redirect("/");
						req.login(results[0], err => {
							console.log(results);
							if (err) return next(err);
							res.sendStatus(200);
						});
					}
				);
			}
		}
	);
});

app.post("/getuser", (req, res) => {
	const username = JSON.stringify(req.body.username);
	db.query(
		`SELECT * FROM users WHERE email = ${username} OR phone = ${username};`,
		(err, results, fields) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (results[0].id) {
				res.sendStatus(200);
			}
		}
	);
});

app.post("/signin", passport.authenticate("local"), (req, res) => {
	res.sendStatus(200);
});

app.post("/logout", checkAuthenticated, (req, res, next) => {
	req.logOut(err => {
		if (err) return next(err);
		res.redirect("/");
	});
});

app.get("/emptylink", (req, res) => {
	res.render("emptylink");
});

app.listen(port, console.log(`Listening on port ${port}`));
