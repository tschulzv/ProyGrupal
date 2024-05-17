const {Post} = require('../models/Post.model');
const {Comment} = require('../models/Post.model');
const mongoose = require("mongoose");
const multer = require('multer');

exports.savePost = async(req, res) => {
    console.log("DENTRO DE CREATEPOST");
    try {
        const newPost = new Post({
          userId: req.body.userId,
          species: req.body.species,
          description: req.body.description,
          filename: `http://localhost:5000/api/static/${req.file.filename}`,
        });
        await newPost.save();
        res.status(201).json({ message: 'Post creado en la DB' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el post' });
      }
}

exports.saveComment = async(req, res) => {
    try {
        // crear el comentario
        const userId = new mongoose.Types.ObjectId(req.body.userId);
        const newComment = new Comment({
          userId: userId,
          text: req.body.text
        });
        await newComment.save();
        
        // guardar en el array de comentarios del post correspondiente
        await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: newComment._id }
        })
        res.status(201).json({ message: 'Comentario creado y guardado en la DB', commentId: newComment._id});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el comentario' });
      }
}

exports.editPost= async(req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updatedPost => res.json({ post: updatedPost}))
    } catch (error) {
        console.log(error);
    } 
}

exports.getPagePosts = async (req, res) => {
  console.log("dentro de get page post");
    try {
        const page = parseInt(req.query.page) || 1; // Página por defecto es 1
        const pageSize = 5; // num de publicaciones por página
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
        const userId = req.params.userId;
        const posts = await Post.find({userId : userId})
            .sort({createdAt: -1})
        res.json({posts: posts})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
}

exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("dentro del controlador, id:", id);
        const post = await Post.findOne({ _id: id });

        res.json({post: post})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la publicacion' });
    }
}

exports.getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await Comment.findOne({ _id: id });

        res.json({comment: comment})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el comentario' });
    }
}

exports.getPostsBySpecies = async (req, res) => {
    try {
        const species = req.params.species;
        const posts = await Post.find({species : species})
        res.json({posts: posts})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener publicaciones' });
    }
}