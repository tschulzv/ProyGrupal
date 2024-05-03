/*const express = require('express');
const router = express.Router();

const postController = require("../controllers/Post.controller.js");

// Rutas para manejar la carga de archivos y creación de posts
router.post("/new", postController.savePost);
router.get("/", postController.getPagePosts);

module.exports = router;*/

const express = require('express');
const router = express.Router();
const upload = require("../libs/storage");
const postController = require("../controllers/Post.controller.js");

// Rutas para manejar la carga de archivos y creación de posts
router.post("/posts/new", upload.single("image"), postController.savePost);
router.get("/posts", postController.getPagePosts);

module.exports = router;
