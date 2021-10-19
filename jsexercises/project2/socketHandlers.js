const matColours = require("./matdes100colours.json");
let coloridx;
const moment = require("moment");
let userNames = [];
let colors = [];
let roomNames = [];
let roomObject = [{ name: "Shanto1407MainRoom", room: "Main" }];
const nameexists = "The Name is alredy taken, Try a different Name";
const handleJoin = (socket, clientData) => {
  try {
    if (userNames.find((name) => name == clientData.chatName)) {
      socket.emit("nameexists", { text: nameexists, users: userNames });
    } else {
      coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
      coorNumner = matColours.colours[coloridx];
      userNames.push(clientData.chatName);
      colors.push({ name: clientData.chatName, color: coorNumner });
      socket.name = clientData.chatName;
      socket.room = clientData.roomName;
      roomNames.push({
        name: clientData.chatName,
        room: clientData.roomName,
        color: coorNumner,
      });
      roomObject.push({ name: clientData.chatName, room: clientData.roomName });
      socket.join(clientData.roomName);
      socket.emit("welcome", {
        text: `Welcome ${clientData.chatName}`,
        users: userNames,
        colour: "rgba(241, 129, 100, 1)",
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        roomname: clientData.roomName,
      });
      socket.to(clientData.roomName).emit("someonejoined", {
        text: `${clientData.chatName} has joined this room`,
        users: userNames,
        colour: "rgba(241, 129, 100, 1)",
        from: "Admin",
        time: moment().format("h:mm:ss a"),
        roomname: clientData.roomName,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const handleMessage = (socket, clientData, io) => {
  try {
    io.in(getRoomName(clientData.from)).emit("newmessage", {
      text: clientData.text,
      from: clientData.from,
      user: userNames,
      colour: getColor(clientData.from),
      time: moment().format("h:mm:ss a"),
      roomname: getRoomName(clientData.from),
    });
  } catch (err) {
    console.log(err);
  }
};
const handleTyping = (socket, clientData) => {
  try {
    socket.to(socket.room).emit("someoneistyping", {
      text: `${clientData.from} is typing`,
      users: userNames,
    });
  } catch (err) {
    console.log(err);
  }
};
const getColor = (name) => {
  let foundColor = colors.find((color) => color.name == name);
  return foundColor.color;
};
const getRoomName = (name) => {
  let roomname = roomNames.find((room) => room.name === name);
  return roomname.room;
};
const handleDisconnect = (socket) => {
  userNames = userNames.filter((name) => name !== socket.name);
  colors = colors.filter((color) => color.name !== socket.name);
  roomNames = roomNames.filter((rooms) => rooms.name !== socket.name);
  roomObject = roomObject.filter((rooms) => rooms.name !== socket.name);
  socket.to(socket.room).emit("someoneleft", {
    text: `${socket.name} has left the server`,
    users: userNames,
    colour: "rgba(241, 129, 100, 1)",
    from: "Admin",
    time: moment().format("h:mm:ss a"),
  });
};
const handleGetRoomsAndUsers = (io) => {
  io.emit("tooall", { roomdetails: roomNames });
};
const handleroomList = (io) => {
  let unique = roomObject
    .map((room) => {
      return room.room;
    })
    .filter((value, index, self) => self.indexOf(value) === index);
  io.emit("roomlist", { roomdetails: unique });
};
module.exports = {
  handleGetRoomsAndUsers,
  handleJoin,
  handleDisconnect,
  handleTyping,
  handleMessage,
  handleroomList,
};
