var express = require("express");
const cors=require('cors');
var bodyparser = require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use("/",require("./routes/chatroom"));
app.use("/user",require('./routes/user'));
app.use("/chatroom", require("./routes/chatroom"));
app.use("/message",require("./routes/message"));

module.exports=app;