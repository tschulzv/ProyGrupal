import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import "../../utils/StyleUtils.style.css";
import "./CreatePost.style.css";
import Navbar from "../../components/Navbar.component.jsx";

const CreatePost = (props) => {
    const {userId} = props.userData.userId;
    const [post, setPost] = useState({
        userId: props.userData.userId, 
        description: "",
        species: ""
    });
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [isUploaded, setIsUploaded] = useState(false);
    const client = new HTTPClient();
    const navigate = useNavigate(); 

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // accede al primer archivo seleccionado
        setFile(file);
        console.log("Archivo seleccionado:", file);
    }

    const handleChange = (e) => {
        setPost({
            ...post, [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Cambia el formato de la especie
        //const formattedSpecies = post.species.trim().toLowerCase().replaceAll(" ", "%20");
        const formattedSpecies = post.species.trim().toLowerCase();
        console.log("especie formateada:", formattedSpecies);
        
        // Espera la validación de la especie antes de continuar
        const isValidSpecies = await validateSpecies(formattedSpecies);
        if (!isValidSpecies) {
            console.log("La especie no es válida");
            return;
        } 
        // validar otros campos
        if (!validate()) { return; }
        console.log("se paso la validacion");
        // crear formdata y asignarle valores
        const formData = new FormData();
        formData.append('image', file); 
        formData.append('species', formattedSpecies);
        formData.append('description', post.description);
        formData.append('userId', post.userId);
        formData.append('comments', []);
    
        console.log("Datos a enviar:", formData);
    
        try {
            const res = await client.createPost(formData);
            console.log("Post publicado con éxito", res);
            setIsUploaded(true);
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (err) {
            console.log("ERROR:", err);
        }
    }

    const validate = () => {
        // bandera para validacion
        let flag = true;

        if (!file) {
            console.log("agrega una imagen");
            setErrors({...errors, image: "Debes seleccionar una imagen"});
            flag = false;
        }

        if (post.description.length < 5){
            console.log("Descripcion debe tener al menos 5 caracteres");
            setErrors({...errors, description: "Descripcion debe tener al menos 5 caracteres"});
            flag = false;
        }
        
        return flag;
    }
    
    const validateSpecies = async (formattedSpecies) => {
        try {
            // Busca la especie en la API
            const res = await client.getPlantInfo(formattedSpecies);
            if (res.data.length === 0) {
                console.log("La especie no existe");
                setErrors({...errors, species: "La especie no existe"});
                return false;
            } else {
                setPost({...post, species: formattedSpecies});
                console.log("La especie existe");
                return true;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    

    // FALTA CONECTAR CON LA API PARA SLECCIONAR LA ESPECIE
    // AGREGAR API DE EDITOR DE TEXTO
    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <div className="form-box">
                    <h1>NUEVO POST</h1>
                    <form encType="multipart/form-data">
                        <label htmlFor="image">Seleccione una foto</label>
                        <input name="image" type="file" accept="image/png, image/jpeg" onChange={e=> handleFileChange(e)}></input>            
                        <label htmlFor="description">Añade una descripcion</label>
                        {errors.image  && <span className="error-msg">{errors.image}</span>}               
                        <input name="description" type="text" onChange={e=> handleChange(e)}></input>
                        {errors.description  && <span className="error-msg">{errors.description}</span>}
                        <label htmlFor = "species">Seleccione la especie</label>
                        <input name="species" type="text" onChange={e=> handleChange(e)}></input>
                        {errors.species  && <span className="error-msg">{errors.species}</span>}
                        <button type="submit" onClick={e => handleSubmit(e)}>Publicar</button>
                        {isUploaded && <p>Se ha subido la publicación exitosamente</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;