const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
require("dotenv").config({ path: `../.env.${process.env.NODE_ENV}` });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
console.log(process.env.MONGODB_CONNECTION_STRING);
//blueprint for objects that mongoDB expects
const todoSchema = new mongoose.Schema({
  item: String,
});

const Todo = mongoose.model("Todo", todoSchema);
// let item1 = Todo({ item: "get milk" }).save(function (err) {
//   if (err) throw err;
//   console.log("item saved");
// });

// let data = [
//   { item: "get milk" },
//   { item: "go to school" },
//   { item: "buy computer" },
// ];
module.exports = function (app) {
  app.get("/todo", function (req, res) {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
    // res.render("todo", { todos: data });
  });
  app.post("/todo", urlencodedParser, function (req, res) {
    const newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json({ todos: data });
    });
    // data.push(req.body);
    // res.json({ todos: data });
  });
  app.delete("/todo/:item", function (req, res) {
    Todo.find({ item: req.params.item })
      .replace(/\-/g, "")
      .remove((err, data) => {
        if (err) throw err;
        res.json({ todos: data });
      });

    // data = data.filter(function (todo) {
    //   return todo.item.replace(/ /g, "-") !== req.params.item;
    // });
    // res.json({ todos: data });
  });
};
