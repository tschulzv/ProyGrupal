const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer');
const path = require('path');
require("./config/mongoose.config");

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
const {oAuthRouter} = require("./routes/oauth.routes");
const userContentRouter = require("./routes/UserContent.routes");
const postRouter = require("./routes/Post.routes");

app.use("/", oAuthRouter);
app.use("/user", userContentRouter);
app.use("/posts", postRouter);

// Configuración de Multer para guardar archivos en el sistema de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        // Renombrar el archivo para evitar conflictos de nombres
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/posts/new', upload.single('image'), (req, res) => {
    console.log("[EN SERVER]", req.file);
    res.send({filename: req.file.filename});
})

app.use('/static', express.static('upload'));


app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})