const express = require('express');
const router = express.Router();
const postController = require("../controllers/Post.controller.js");

router.post("/posts/new", postController.createPost);
router.get("/posts", postController.getUserProfile);
module.exports = router;