const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("./user");

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    text: {
        type: String
    }
})
// FALTA AGREGAR LA ESPECIE DE LA PLANTA DEL POST
const PostSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },

    description: {
        type: String
    },

    // MODIFICAR AL INTEGRAR LA API!
    species:{
        type: String
    },

    filename:{
        type: String
    },

    filepath:{
        type: String
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
    
}, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { 
    Post,
    Comment
};