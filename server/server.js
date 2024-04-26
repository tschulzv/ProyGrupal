const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("./config/mongoose.config");

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
const {oAuthRouter} = require("./routes/oauth.routes");
app.use("/", oAuthRouter);

app.listen(5000, () => {
    console.log("Exito: app escuchando en puerto 5000")
})