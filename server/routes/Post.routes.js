const express = require('express');
const router = express.Router();

const postController = require("../controllers/Post.controller.js");

// Rutas para manejar la carga de archivos y creación de posts
router.post("/posts/new", postController.savePost);
router.get("/posts", postController.getPagePosts);

module.exports = router;
