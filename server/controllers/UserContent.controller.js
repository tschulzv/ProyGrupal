const {UserContent} = require('../models/UserContent.model');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "$h0laMwnd0";
const { verifyToken } = require("../utils/oauth.js");


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

