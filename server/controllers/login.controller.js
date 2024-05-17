const {User} = require("../models/user");
const {UserContent} = require("../models/UserContent.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const JWT_SECRET = "$h0laMwnd0"

const register = async (req, res) => {
    let userData = req.body
    try {

        let existUser = await User.exists({email: userData.email})

        if (existUser){
            return res.status(500).json({errors: {email: "El email ya existe"}})
        }

        let hash = await new Promise((resolve, reject) => {
            bcrypt.hash(userData.password, 10, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })
        // crear el usuario ( email, contraseña etc)
        let user = new User({
            ...userData,
            password: hash
        })
        await user.save();
        // crear el contenido del usuario (biografia, foto etc)
        let userContent = new UserContent({
            userId: user._id,
            name: userData.name
        });
        await userContent.save();
        res.json({userData: userContent});
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            let errors = {}
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message
            })

            res.status(400).json({errors: errors})
        } else {
            res.status(500).json({error: error.toString()})
        }
    }
}

const login = async (req, res) => {
    let data = req.body;
    try {
        let user = await User.findOne({email: data.email})

        let samePassword = await bcrypt.compareSync(data.password, user.password);

        if (samePassword){
            const payload = {
                id: user._id,
                name: user.name
            }

            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d"
            });

            let refreshToken = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d"
            });

            res.cookie("token", token, {
                httpOnly: true
            })

            res.json({
                user: payload,
                token,
                refreshToken
            })
        } else {
            res.status(400).json({error: "Usuario y contraseña equivocados"})
        }
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){

        } else {
            res.status(500).json({error: error.toString()})
        }
        
    }
}

const refresh = (req, res) => {
    let data = req.body;

    if (!data.refreshToken){
        return res.json({error: "Refresh token no enviado"})
    }

    try {
        let payload = jwt.verify(data.refreshToken, JWT_SECRET);
        payload = {
            id: payload.id,
            name:payload.name
        }
        /*
        del payload.iat
        del payload.exp
        */


        let token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "30s"
        });
        let refreshToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1000d"
        });

        res.json({
            token,
            refreshToken
        })
        
    } catch (error) {
        return res.json({error: error.toString()})
    }
}


module.exports = {
    register,
    login,
    refresh
}