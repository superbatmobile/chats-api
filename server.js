var express = require("express");
const mongoose=require('mongoose')
require('dotenv').config();
require("./models/User");
require("./models/ChatRoom");
require("./models/Message");
const app=require('./app');
const jwt = require("jwt-then");
const User = mongoose.model("User");
const router=require("express").Router();
/*
const path = require("path");

const CLIENT_BUILD_PATH = path.join(__dirname, "../co-edit/build");
app.use(express.static(CLIENT_BUILD_PATH));
app.get("/", function(req, res) {
  res.sendFile(path.join(CLIENT_BUILD_PATH , "index.html"));
});
*/

mongoose
  .connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log(process.env.MONGODB_URI);
    console.log("Error is ", err.message);
  });
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

 const server = app.listen(8000 , () => {
  console.log("Server listening on port 8000");
});


const io = require("socket.io")(server);

/*
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {}
});
*/


io.on("connection", (socket) => {
  console.log("Connected: ");

  socket.on("disconnect", () => {
    console.log("Disconnected: " );
  });
  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);

  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
  });

  socket.on("chatroomMessage", async ({ chatroomId, message,ID,username }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: ID });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: ID,
        message,
        username,
      });
      await newMessage.save();
      io.to(chatroomId).emit("newMessage", {
        ID,
        message,
        username,
      });

    }
  });

})