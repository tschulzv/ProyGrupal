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

    getUserById(id){
        return this.instance.get(`/user/profile?=${id}`)
    }

    /****               POSTS                ****/ 
    /*createImage(data){
        return this.instance.post("/image/new", data);
    }*/

    createPost(data) { 
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('description', data.description);
        formData.append('species', data.species);
        formData.append('userId', data.userId);
        formData.append('comments', data.comments);
        return this.instance.post("/posts/new", data);
    }

    getPagePosts(page){
        return this.instance.get(`/posts?page=${page}`);
    }

    // obtener un post dado su id
    getPostById(id){
        return this.instance.get(`/posts/${id}`);
    }

    // obtener posts de un usuario dado su id de usuario
    getUserPosts(userId){
        //return this.instance.get(`/posts?userId=${userId}`);
        return this.instance.get(`/posts/user/${userId}`);
    }
    // obtener posts de buscar una especie
    getPostsBySpecies(species){
        //return this.instance.get(`/posts?species=${species}`);
        return this.instance.get(`/posts/species/${species}`);
    }

    // ACCEDER A LA API DE TREFLE, DADA UNA PLANTA
    /*async getPlantInfo(query){
       return this.instance.get(`/plants/${query}`);
    }*/
    getPlantInfo(query){
       return this.instance.get(`/plants/${query}`);
    }

}

export default HTTPClient;