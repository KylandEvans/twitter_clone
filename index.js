const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const engine = require("ejs-mate");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
	res.render("index");
});

app.post("/signup", (req, res) => {
	const data = req.body;
	console.log(data);
	if (data.email) {
		res.redirect(200, "/signup");
		return;
	} else {
		res.status(404).send("Bad Request");
		return;
	}
});

app.get("/signup", (req, res) => {
	res.send("You have been signed in ");
});

app.get("/emptylink", (req, res) => {
	res.render("emptylink");
});

app.listen(port, console.log(`Listening on port ${port}`));
