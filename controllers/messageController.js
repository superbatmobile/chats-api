const mongoose = require("mongoose");
const Message = mongoose.model("Message");

exports.getAllMessages = async (req, res) => {
  //const {chatroomId}=req.body
  //const messages = await Message.find({ chatroomId});
  const {chatroom}=req.query
  console.log(chatroom);
const chatmess = await Message.find({chatroom});
  res.json(chatmess);
  //console.log(chatmess);
}