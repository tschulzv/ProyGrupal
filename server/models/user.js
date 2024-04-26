// schema relacionado con auth del usuario
const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Nombre es obligatorio"],
        minlength: [10, "El nombre no puede tener menos de 10 caracteres"]
    },
    email: {
        type: String,
        required: [true, "Email es obligatorio"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    }
})

const User =  mongoose.model("Users", UserSchema);

module.exports = {
    User
}