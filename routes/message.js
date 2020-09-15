const router=require("express").Router();
var bodyParser = require('body-parser')
const messageController=require("../controllers/messageController");

router.get("/",messageController.getAllMessages);

module.exports=router;