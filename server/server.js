const express = require('express')
const app = express();
const nodeFetch = require('node-fetch');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
require("./config/mongoose.config");

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
const {oAuthRouter} = require("./routes/oauth.routes");
const userContentRouter = require("./routes/UserContent.routes");
const postrouter = require("./routes/Post.routes");
const trefleRouter = require("./routes/Trefle.routes");
const forumRouter = require("./routes/Forum.routes");

app.use("/", forumRouter);
app.use("/", postrouter);
app.use("/", oAuthRouter);
app.use("/user", userContentRouter);
app.use("/plants", trefleRouter);
app.use("/", forumRouter);
app.use("/api/static", express.static(path.join(__dirname, 'uploads')));

/*app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
app.post('/api/content', (req, res) => {
    const { content } = req.body;
})*/

app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})