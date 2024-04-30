import React, { useState, useEffect } from 'react';
import HTTPClient from '../../utils/HTTPClient';
import "../../components/StyleUtils.style.css";
import Navbar from "../../components/Navbar.component.jsx";

const CreatePost = (props) => {
    const {userId} = props.userData.userId;
    const [post, setPost] = useState();
    const [errors, setErrors] = useState();
    const client = new HTTPClient();

    const handleChange = (e) => {
        setPost({
            ...post, [e.name] : e.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validate) { return; }
        let data = { ...post, userId : userId, comments: []}

        client.createPost(data)
            .then(res => {
                console.log("Post publicado con exito", res);
            })
            .catch(err => { console.log("ERROR:", err)});
    }

    const validate = () => {
        let flag = true;

        if (post.image === null) {
            setErrors({...errors, image: "Debes seleccionar una imagen"});
            flag = false;
        }
        if (post.description.length < 5){
            setErrors({...errors, description: "Descripcion debe tener al menos 5 caracteres"});
            flag = false;
        }
        if (post.species === ""){
            setErrors({...errors, species: "Debes seleccionar la especie"});
            flag = false;
        }

        return flag;
    }

    // FALTA CONECTAR CON LA API PARA SLECCIONAR LA ESPECIE
    // AGREGAR API DE EDITOR DE TEXTO
    return (
        <div className="wrapper">
            <div className="content">
                <Navbar />
                <div className="main">
                    <form enctype="multipart/form-data" >
                        <label for="image" >Seleccione una foto</label>
                        <input name="image" type="file" accept="image/png, image/jpeg" onChange={e=> handleChange(e)}></input>
                        <label for="description">Añade una descripcion</label>
                        <input name="description" type="text" onChange={e=> handleChange(e)}></input>
                        <label for = "species">Seleccione la especie</label>
                        <input type="text" onChange={e=> handleChange(e)}></input>
                        <button type="submit" onClick={e => handleSubmit(e)}>Publicar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;