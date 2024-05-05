const express = require('express');
const router = express.Router();
const upload = require("../libs/storage");
const postController = require("../controllers/Post.controller.js");

router.post("/posts/new", upload.single("image"), postController.savePost);
router.get("/posts", postController.getPagePosts);
router.get("/posts/:userId", postController.getUserPosts);
router.get("/posts/:id", postController.getPostById);
router.get("/posts/:species", postController.getPostsBySpecies);

module.exports = router;
