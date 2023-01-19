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
const { type } = require("os");

const sessionOptions = {
	secret: "secret",
	resave: false,
	saveUninitialized: false,
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

let currUser;

function validateNewUserData(data) {
	if (!data.name) {
		// console.log("No mane");
		return true;
	}
	if (!data.phone && !data.email) {
		// console.log("No phone & email");
		return true;
	}
	if (data.phone && data.email) {
		// console.log("Both phone & email");
		return true;
	}
	if (!data.password) {
		// console.log("No pass");
		return true;
	}
}

// function getUserByPhone(phone)

function authenticateUser(email, phone, password, done) {
	const userByPhone = getUserByPhone(phone);
	const userByEmail = getUserByEmail(email);
	if (userByPhone) {
		return done(null, userByPhone);
	}
	if (userByEmail) {
		return done(null, userByEmail);
	}
	return done(null, false, { message: "email or phone not valid" });
}

passport.use(new LocalStrategy({ usernameField: "email" || "phone" }, authenticateUser));

app.get("/", (req, res) => {
	if (currUser) {
		return res.render("index_feed");
	}
	return res.render("index_login");
});

app.post("/signup", async (req, res) => {
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
				currUser = results.insertId;
				return res.redirect("/");
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

app.post("/signin", (req, res) => {
	const usn = JSON.stringify(req.body.username);
	const pwd = JSON.stringify(req.body.password);
	db.query(
		`SELECT * FROM users WHERE email = ${usn} OR phone = ${usn};`,
		async (err, results, fields) => {
			// console.log(results);
			if (err) {
				return res.status(500).send(err);
			}
			if (results[0].id) {
				const user = results[0];
				const isMatch = await bcrypt.compare(pwd, user.password);
				console.log(isMatch);
				console.log(`isMatch is ${isMatch}`);
				if (isMatch) {
					currUser = user.id;
					return res.sendStatus(200);
				} else {
					currUser = null;
					return res.sendStatus(404, "incorrect password");
				}
			}
		}
	);
});

app.get("/emptylink", (req, res) => {
	res.render("emptylink");
});

app.listen(port, console.log(`Listening on port ${port}`));
