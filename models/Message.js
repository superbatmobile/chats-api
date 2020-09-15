var mongoose = require('mongoose');
const MessageSchema = mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Chatroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  username:{
    type:String,
    required: true,
  },
   
});
module.exports = Message = mongoose.model('Message',MessageSchema);