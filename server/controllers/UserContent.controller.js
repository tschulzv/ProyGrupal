const {UserContent} = require('../models/UserContent.model');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "$h0laMwnd0";
const { verifyToken } = require("../utils/oauth.js");

// usado para obtener el contenido del usuario que INICIO SESION
exports.getUserProfile = async (req, res) => {
    try {
    // en el middleware verifyToken se obtuvo el payload y se guardo en req.user
    const id = req.user.id;
    console.log("USERCONTROLLER, ID:", id);

    // Usar el userId para recuperar el contenido del usuario
    const userContent = await UserContent.findOne({ userId: id });

    if (!userContent) {
        return res.status(404).json({ error: "Perfil de usuario no encontrado" });
    }
    
    // Enviar el contenido del usuario como respuesta
    res.json(userContent);
    } catch (error) {
    return res.status(500).json({ error: error.toString() });
    }
};

// usado para obtener cualquier usuario
exports.getUserById = async (req, res)=> {
    try {
        const userId = req.params.userId;
        const user = await UserContent.findOne({userId : userId});

        if (!user) {
            return res.status(404).json({ error: "Perfil de usuario no encontrado" });
        }
        
        // Enviar el contenido del usuario como respuesta
        res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }
}

exports.updateUserProfile = async (req, res) => {
    console.log("DENTRO DE UPDATEUSER");
    try {
            const { userId, name, bio } = req.body;
            const profileImage = req.file ? req.file.filename : null;
            console.log(profileImage);

            const updateData = { userId, name, bio };
            if (profileImage) {
                updateData.profileImage = `http://localhost:5000/api/static/${profileImage}`;
            }
            updateData.userId=req.user.id
            
            console.log("funca", updateData);
            console.log(updateData.userId);

            const updatedUser = await UserContent.findOneAndUpdate(
                {userId: req.user.id}, // Usando req.user.id como el identificador del usuario
                updateData,
                { new: true }
            );

            console.log("updated user", updatedUser);
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            console.log("Usuario encontrado");

            res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '(controlador)Error al actualizar el perfil' });
    }
};



    /*
    try {
        // Obtener el token JWT de las cookies
        const token = req.cookies.token;
        if (token) {
            console.log("se ha obtenido el token: ", token);
        } else {
            return res.status(401).json({ error: "Token no encontrado" });
        }

        // Verificar el token JWT para obtener el payload
        const payload = jwt.verify(token, JWT_SECRET);
        
        // Obtener el userId del payload
        const userId = payload.id;
        console.log("USERCONTROLLER, ID:", userId);

        // Usar el userId para recuperar el contenido del usuario
        const userContent = await UserProfile.findOne({ _id: userId });

        if (!userContent) {
            return res.status(404).json({ error: "Perfil de usuario no encontrado" });
        }
        
        // Enviar el contenido del usuario como respuesta
        res.json(userContent);
    } catch (error) {
        return res.status(500).json({ error: error.toString() });
    }*/

