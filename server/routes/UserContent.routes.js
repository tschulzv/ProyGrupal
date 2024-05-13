const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserContent.controller.js");
const { verifyToken } = require("../utils/oauth.js");

router.get("/profile", verifyToken, userController.getUserProfile);
router.get("/:userId", userController.getUserById);
module.exports = router;