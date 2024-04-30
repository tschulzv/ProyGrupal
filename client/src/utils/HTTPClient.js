import axios from "axios";

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:5000",
            withCredentials: true
        })
    }

    /****               LOGIN Y REGISTRO                ***/ 
    login(email, password){
        return this.instance.post("/login", {
            email,
            password
        })
    }

    register(data){
        return this.instance.post("/register", data)
    }

    /****       CONTENIDO DEL USUARIO         ****/ 

    getUserData(){
        return this.instance.get("/user/profile");
    }

    /****               POSTS                ****/ 

    createPost(data) {
        return this.instance.post("/posts/new", data);
    }
    // falta implementar!
    getPagePosts(page){
        return this.instance.get(`/posts?page=${page}`);
    }

    getUserPosts(userId){
        return this.instance.get(`/posts?id=${userId}`);
    }

    getSearchedPosts(search){
        return this.instance.get(`/posts?search=${search}`);
    }
}

export default HTTPClient;