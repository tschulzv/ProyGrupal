const mongoose = require("mongoose");
const { Schema } = mongoose;
const { User } = require("./user");

const CommentForumSchema = new Schema({
    forumId:{
        type : Schema.Types.ObjectId,
        ref : 'Forum'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },
    userName: String,
    text: {
        type: String
    }
})
const ForumSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User' 
    },

    userName: {
        type: String 
    },

    title:{
        type: String,
        required: [true, "Titulo es obligatorio"]
    },

    description: {
        type: String,
        required: [true, "Descripcion es obligatoria"]
    },

    commentsForum: [CommentForumSchema] 
    
}, {timestamps: true});

const Forum = mongoose.model("Forum", ForumSchema);
const CommentForum = mongoose.model("CommentForum", CommentForumSchema);

module.exports = { 
    CommentForum, 
    Forum 
};