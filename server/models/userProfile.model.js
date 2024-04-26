
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProfileSchema = new Schema({
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
        type: String // ruta del archivo
    }, 
    bio : {
        type: String
    }
    
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;