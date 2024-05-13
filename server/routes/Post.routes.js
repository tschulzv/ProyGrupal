const express = require('express');
const router = express.Router();
const upload = require("../libs/storage");
const postController = require("../controllers/Post.controller.js");

router.post("/posts/new", upload.single("image"), postController.savePost);
router.post("/posts/:id/edit", postController.editPost);
router.post("/posts/:id/comment", postController.saveComment);
router.get("/posts", postController.getPagePosts);
router.get("/posts/user/:userId", postController.getUserPosts);
router.get("/posts/:id", postController.getPostById)
router.get("/comments/:id", postController.getCommentById)
router.get("/posts/species/:species", postController.getPostsBySpecies);

module.exports = router;
