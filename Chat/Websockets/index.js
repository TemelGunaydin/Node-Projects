const express = require("express");
const socket = require("socket.io");

//build server
const app = express();

//listen
const port = 4000;
const server = app.listen(port, () => {
  console.log(`listening port at ${port}`);
});

//static file serving
app.use(express.static("public"));

//socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("Made a socket connection with id", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on('typing',(data)=>{
      socket.broadcast.emit('typing',data);
  });
});
