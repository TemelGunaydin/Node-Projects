const express = require("express");
const todoController = require("./controllers/todoController.js");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public"));

todoController(app);

app.listen(3000);

console.log("You are listening port number 3000");
