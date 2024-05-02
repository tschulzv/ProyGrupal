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
    /*createImage(data){
        return this.instance.post("/image/new", data);
    }*/

    createPost(data) { 
        /*const formData = new FormData();
        formData.append('image', data.image);
        formData.append('description', data.description);
        formData.append('species', data.species);
        formData.append('userId', data.userId);
        formData.append('comments', data.comments);*/
        /*headers: {
            'Content-Type': 'multipart/form-data'
        }*/
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