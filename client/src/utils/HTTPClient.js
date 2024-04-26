import axios from "axios";

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true,
        })
    }

    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    //Escriba sus apis
    /*
    Ejemplo
    getStudents(){
        return this.instance.get("/student/")
    }
    */

    
}

export default HTTPClient;