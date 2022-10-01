const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const engine = require("ejs-mate");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/emptylink", (req, res) => {
	res.render("emptylink");
});

app.listen(port, console.log(`Listening on port ${port}`));
