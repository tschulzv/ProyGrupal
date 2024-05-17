const {Forum} = require('../models/Forum.model');

exports.saveForum = async(req, res) => {
    try {
        const newForum = new Forum({
            userId: req.body.userId,
            userName: req.body.userName,
            title: req.body.title,
            description: req.body.description
        });
        await newForum.save();
        res.status(201).json({ message: 'Foro creado en la DB' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el foro' });
    }
}

exports.getPageForum = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Página por defecto es 1
        const pageSize = 10; // num de publicaciones por página
        const skip = (page - 1) * pageSize; // publicaciones que ignorara (las de la pag anterior)

        // Consulta las publicaciones para la página actual
        const forums = await Forum.find()
            .sort({ createdAt: -1 }) // Ordena por fecha de creación descendente
            .skip(skip)
            .limit(pageSize);

        res.json({ forums: forums, currentPage: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};

exports.getUserForums = async (req, res) => {
    try {
        const id = parseInt(req.query.userId);
        const forums = await Forums.find({userId : id})
            .sort({createdAt: -1})
        res.json({forums: forums})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el foro' });
    }
}
exports.getForumById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("dentro del controlador, id:", id);
        const forum = await Forum.findOne({_id : id})
        res.json({forum: forum})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la publicacion' });
    }
}

const {CommentForum} = require('../models/Forum.model');

exports.saveComments = async (req, res) => {
    try {
        const newComment = new CommentForum({
            forumId: req.body.forumId,
            userId: req.body.userId,
            userName: req.body.userName,
            text: req.body.text
        });

        // Obtener el ID del foro desde los datos del cuerpo de la solicitud
        const forumId = req.body.forumId;

        // Guardar el comentario en la base de datos
        await newComment.save();

        // Buscar el foro por su ID
        const forum = await Forum.findById(forumId);

        // Asignar la referencia del comentario al foro
        forum.commentsForum.push(newComment);

        // Guardar el foro actualizado con la referencia al comentario
        await forum.save();

        // Responder con un mensaje de éxito
        res.status(201).json({ message: 'Comentario creado en la base de datos' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el comentario' });
    }
};

exports.getCommentsByForumId = async (req, res) => {
    try {
        // Obtener el ID del foro desde los parámetros de la solicitud
        const forumId = req.params.forumId;
        
        // Buscar el foro en la base de datos
        const forum = await Forum.findById(forumId);
        
        if (!forum) {
            return res.status(404).json({ error: 'El foro no existe' });
        }

        // Obtener los comentarios asociados al foro
        const comments = await CommentForum.find({ forumId });

        // Responder con los comentarios obtenidos
        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los comentarios' });
    }
};        