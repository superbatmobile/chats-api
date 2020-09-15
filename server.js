
const mongoose=require('mongoose')
require('dotenv').config();
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
const app=require('./app');
const jwt = require("jwt-then");
const User = mongoose.model("User");

mongoose
  .connect(process.env.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log("Error is ", err.message);
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
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
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
      console.log(newMessage);
      io.to(chatroomId).emit("newMessage", {
        ID,
        message,
        username,
      });

    }
  });

})