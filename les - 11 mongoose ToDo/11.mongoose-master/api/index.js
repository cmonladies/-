const express = require("express");
let app = module.exports = express();

let users = require("./users");
let todo = require("./todo");

app.use('/api/users', users);
app.use("/api/todo", todo);

app.get("/", (req, res) => {
	res.render('index');
});