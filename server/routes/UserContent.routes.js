const express = require('express');
const router = express.Router();
const userController = require("../controllers/UserContent.controller.js");
const { verifyToken } = require("../utils/oauth.js");
const upload = require("../libs/storage");

router.get("/profile", verifyToken, userController.getUserProfile);
router.get("/:userId", userController.getUserById);
router.put("/profile/update/:userId", verifyToken, upload.single('profileImage'), userController.updateUserProfile);

module.exports = router;