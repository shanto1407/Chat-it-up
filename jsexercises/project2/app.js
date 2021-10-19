require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.PORT || 5000;

app.enable("trust proxy");
app.use((req, res, next) => {
  req.secure
    ? // request was via https, so do no special handling
      next()
    : // request was via http, so redirect to https
      res.redirect("https://" + req.headers.host + req.url);
});
app.use(express.static("public"));
let server = http.createServer(app);
let io = socketIO(server);
const socketHandlers = require("./socketHandlers");
//app.get("/", (req, res) => res.send("<h1>Hello World From Express</h1>"));
// main socket routine
// client connects here
io.on("connection", (socket) => {
  socketHandlers.handleroomList(io);
  // scenario 1 - client sends server 'join' message using room to join
  socket.on("join", (clientData) => {
    socketHandlers.handleJoin(socket, clientData);
    socketHandlers.handleGetRoomsAndUsers(io);
  });
  // scenario 2 - client disconnects from server
  socket.on("disconnect", () => {
    socketHandlers.handleDisconnect(socket);
    socketHandlers.handleGetRoomsAndUsers(io);
  });
  // scenario 3 - client starts typing
  socket.on("typing", (clientData) => {
    socketHandlers.handleTyping(socket, clientData);
  });
  // scenario 4 - message
  socket.on("message", (clientData) => {
    socketHandlers.handleMessage(socket, clientData, io);
  });
});

// will pass 404 to error handler
app.use((req, res, next) => {
  const error = new Error("No such route found");
  error.status = 404;
  next(error);
});
// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});
server.listen(port, () => console.log(`starting on port ${port}`));
