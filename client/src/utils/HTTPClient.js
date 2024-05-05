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
    // falta implementar!
    getPagePosts(page){
        return this.instance.get(`/posts?page=${page}`);
    }

    // obtener posts de un usuario dado su id de usuario
    getUserPosts(userId){
        return this.instance.get(`/posts?userId=${userId}`);
    }
    // obtener posts de buscar una especie
    getPostsBySpecies(species){
        return this.instance.get(`/posts/${species}`);
    }
    // obtener un post dado su id
    getPostById(id){
        return this.instance.get(`/posts/${id}`);
    }

    // ACCEDER A LA API DE TREFLE, DADA UNA PLANTA
    async getPlantInfo(query){
        try {
            console.log(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
            const response = await fetch(`https://trefle.io/api/v1/species/search?token=RguHEXDbHljgz7X8MfVotulVhUnfNN7dUGIm2ysn1Bw&q=${query}`);
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('Error al obtener la información', error);
            return null;
        }
    }

    /*
    createComment(postId, comment){
        return this.instance.post
    }*/
}

export default HTTPClient;