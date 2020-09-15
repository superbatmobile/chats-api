const router = require("express").Router();
const chatroomController = require("../controllers/chatroomController");
const auth = require("../middlewares/auth");

router.post("/", chatroomController.createChatroom);

router.get("/", chatroomController.getAllChatrooms);

module.exports = router;