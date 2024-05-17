import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from "../../components/Navbar.component.jsx";
import "../CreatePostPage/CreatePost.style.css"
const CreateForum = (props) => {
    const userId = props.userData?.userId || '';
    const userName = props.userData?.name || '';
    
    const [forum, setForum] = useState({
        userId: userId,
        userName: userName,
        title: "",
        description: "",
        comments: []
    });
    const [errors, setErrors] = useState({});
    const [isUploaded, setIsUploaded] = useState(false);
    const client = new HTTPClient();
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForum({
            ...forum, [e.target.name] : e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) { return; }

        client.createForum(forum)
            .then(res => {
                setIsUploaded(true);
                setTimeout(() => {
                    navigate("/forum");
                }, 2000);
            })
            .catch(err => { 
                console.log("ERROR:", err);
                setErrors({ submit: "Error al publicar el foro" });
            });
    }

    const validate = () => {
        let flag = true;

        if (forum.description.length < 5){
            setErrors({ description: "La descripción debe tener al menos 5 caracteres" });
            flag = false;
        }
        if (forum.title === ""){
            setErrors({ title: "Debes ingresar un título" });
            flag = false;
        }
        return flag;
    }

    return (
        
        <div className="wrapper">
            <div className="content">
                <Navbar />
                <div className="content">
                    <div className="form-box">
                        <h1>NUEVO FORO</h1>
                        <form>
                            <label htmlFor="title">Titulo: </label>
                            <input name="title" type="text" onChange={handleChange}></input>
                            {errors.title && <p className="error-msg">{errors.title}</p>}
                            <label htmlFor="description">Añade una descripción</label>
                            <textarea name="description" type="text" onChange={handleChange}></textarea>
                            {errors.description && <p className="error-msg">{errors.description}</p>}
                            <button type="submit" onClick={handleSubmit}>Publicar</button>
                            {isUploaded && <p className="error-msg">Se ha subido exitosamente</p>}
                            {errors.submit && <p className="error-msg">{errors.submit}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForum;