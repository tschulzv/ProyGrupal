const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserContentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, "Nombre es obligatorio"],
        minlength: [10, "El nombre no puede tener menos de 10 caracteres"]
    },
    profileImage: {
        type: String, // ruta del archivo
        default: "/default-avatar.jpg"
    }, 
    bio : {
        type: String,
        default: "Hi!"
    }
    
});

const UserContent = mongoose.model("UserContent", UserContentSchema);

module.exports = { UserContent };