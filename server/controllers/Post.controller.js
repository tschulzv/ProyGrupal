const {Post} = require('../models/Post.model');
const multer = require('multer');

// Controlador para manejar la carga de archivos
const handleFileUpload = upload.single('image');

// Middleware para manejar la carga de archivos antes del controlador
exports.uploadMiddleware = (req, res, next) => {
  handleFileUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Error de Multer
      return res.status(500).json({ error: 'Error al cargar el archivo' });
    } else if (err) {
      // Otro error
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    // Continuar con el siguiente middleware o controlador
    next();
  });
};

exports.createPost = async(req, res) => {
    try {
        // informacion del file
        const { originalname, filename, path } = req.file;
        // crear el post con titulo, descripcion y datos del archivo
        const newPost = new Post({
          userId: req.body.userId,
          title: req.body.title,
          description: req.body.description,
          filename: filename,
          filepath: path
        });
        await newPost.save();
        res.status(201).json({ message: 'Post creado exitosamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el post' });
      }
}


exports.getPagePosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página por defecto es 1
        const pageSize = 10; // num de publicaciones por página
        const skip = (page - 1) * pageSize; // publicaciones que ignorara (las de la pag anterior)

        // Consulta las publicaciones para la página actual
        const posts = await Post.find()
            .sort({ createdAt: -1 }) // Ordena por fecha de creación descendente
            .skip(skip)
            .limit(pageSize);

        res.json({ posts: posts, currentPage: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};


exports.getUserPosts = async (req, res) => {
    try {
        const id = parseInt(req.query.id);
        const posts = await Post.find({userId : id})
            .sort({createdAt: -1})
        res.json({posts: posts})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
}
