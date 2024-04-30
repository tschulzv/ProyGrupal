const {Post} = require('../models/Post.model');

exports.createPost = async(req, res) => {
    Post.create(req.body)
        .then(newPost => res.json({post: newPost}))
        .catch(err => res.json({msg: "ERROR", error: err}));
}

module.exports.createResource = (req, res) => {
    Resource.create(req.body)
        .then(newResource => res.json({resource : newResource}))
        .catch(err => res.json({msg: "ERROR", error: err}));
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
