const router=require("express").Router();
var bodyParser = require('body-parser')
const userController=require("../controllers/userController");

router.post("/login",userController.login);
router.post("/register",userController.register);

module.exports=router;