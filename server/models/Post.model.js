const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("./user");

const CommentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    text: {
        type: String
    }
})
// FALTA AGREGAR LA ESPECIE DE LA PLANTA DEL POST
const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

    description: {
        type: String
    },

    // MODIFICAR AL INTEGRAR LA API!
    species:{
        type: String
    },

    image: {
        type: String // ruta del archivo
    }, 

    comments : [CommentSchema]
    
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { 
    Post,
    Comment
};