const express = require('express');
const router = express.Router();
const postController = require("../controllers/Post.controller.js");
const multer  = require('multer');
const path = require('path');


// Configuración de Multer para guardar archivos en el sistema de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      // Renombrar el archivo para evitar conflictos de nombres
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
  // Middleware de Multer para manejar la carga de archivos
const upload = multer({ storage: storage });

router.post("/posts/new", postController.uploadMiddleware, postController.createPost);
router.get("/posts", postController.getUserProfile);
module.exports = router;