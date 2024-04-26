const mongoose = require("mongoose");
// 
mongoose.connect("mongodb://localhost/plantdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>{console.log("Successfully connected to the database")})
    .catch((err)=> {console.log("ERROR: ", err)});