import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import "../../components/StyleUtils.style.css";
import Navbar from "../../components/Navbar.component.jsx";

const CreatePost = (props) => {
    const {userId} = props.userData.userId;
    const [post, setPost] = useState({
        userId: props.userData.userId, 
        description: "",
        species: "",
        comments: []
    });
    const [file, setFile] = useState();
    const [errors, setErrors] = useState();
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

    const handleSubmit = (e) => {
        console.log("DENTRO DE HANDLESUBMIT");
        e.preventDefault();

        if (!validate()) { return; }
        console.log("se paso la validacion");

        const formData = new FormData();
        formData.append('image', file); // Agrega el archivo al FormData

        for (const key in post) {
            formData.append(key, post[key]);
        }

        console.log("Datos a enviar:", formData);

        client.createPost(formData)
            .then(res => {
                console.log("Post publicado con exito", res);
                setIsUploaded(true);
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            })
            .catch(err => { console.log("ERROR:", err)});
    }

    const validate = () => {
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
        if (post.species === ""){
            console.log("Debes seleccionar la especie");
            setErrors({...errors, species: "Debes seleccionar la especie"});
            flag = false;
        }
        console.log("flag:", flag);
        return flag;
    }

    // FALTA CONECTAR CON LA API PARA SLECCIONAR LA ESPECIE
    // AGREGAR API DE EDITOR DE TEXTO
    return (
        <div className="wrapper">
            <div className="content">
                <Navbar />
                <div className="main">
                    <form encType="multipart/form-data" >
                        <label htmlFor="image" >Seleccione una foto</label>
                        <input name="image" type="file" accept="image/png, image/jpeg" onChange={e=> handleFileChange(e)}></input>
                        <label htmlFor="description">Añade una descripcion</label>
                        <input name="description" type="text" onChange={e=> handleChange(e)}></input>
                        <label htmlFor = "species">Seleccione la especie</label>
                        <input name="species" type="text" onChange={e=> handleChange(e)}></input>
                        <button type="submit" onClick={e => handleSubmit(e)}>Publicar</button>
                        {isUploaded && <p>Se ha subido la publicación exitosamente</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;