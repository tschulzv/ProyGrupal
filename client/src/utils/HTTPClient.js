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

    getUserById(userId){
        return this.instance.get(`/user/${userId}`)
    }

    updateUser(id, data) {
        return this.instance.put(`/user/profile/update/${id}`, data);
        /*{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });*/
    }
   
    /****               POSTS                ****/ 

    createPost(data) { 
        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('description', data.description);
        formData.append('species', data.species);
        formData.append('userId', data.userId);
        formData.append('comments', data.comments);
        return this.instance.post("/posts/new", data);
    }

    editPost(id, data){
        return this.instance.put(`/posts/${id}/edit`, data);
    }

    saveComment(id, data){
        console.log("en http client", data);
        return this.instance.post(`/posts/${id}/comment`, data);
    }

    getPagePosts(page){
        return this.instance.get(`/posts?page=${page}`);
    }

    getCommentById(id){
        return this.instance.get(`/comments/${id}`);
    }

    // obtener un post dado su id
    getPostById(id){
        return this.instance.get(`/posts/${id}`);
    }

    // obtener posts de un usuario dado su id de usuario
    getUserPosts(userId){
        return this.instance.get(`/posts/user/${userId}`);
    }
    // obtener posts de buscar una especie
    getPostsBySpecies(species){
        return this.instance.get(`/posts/species/${species}`);
    }

      /****               FORUM                ****/ 
      createForum(data) { 
        return this.instance.post("/forum/new", data);
    }
    
    // falta implementar!
    getPageForum(page){
        return this.instance.get(`/forum?page=${page}`);
    }

    // obtener posts de un usuario dado su id de usuario
    getUserForums(userId){
        return this.instance.get(`/forum?userId=${userId}`);
    }

    // obtener un post dado su id
    getForumById(id){
        return this.instance.get(`/forum/${id}`);
    }

    createComment(comment) { 
        return this.instance.post(`/forum/comment`, comment);
    }
    getCommentsByForumId(forumId) {
        return this.instance.get(`/forum/${forumId}`);
    }

    // ACCEDER A LA API DE TREFLE, DADA UNA PLANTA
    getPlantInfo(query){
       return this.instance.get(`/plants/${query}`);
    }

}

export default HTTPClient;