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

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

    description: {
        type: String
    },

    image: {
        type: String // ruta del archivo
    }, 

    comments : [CommentSchema]
    
});

const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { 
    Post,
    Comment
};