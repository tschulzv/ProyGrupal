const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
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

app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})