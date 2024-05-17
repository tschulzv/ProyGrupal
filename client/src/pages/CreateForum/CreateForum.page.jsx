import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from "../../components/Navbar.component.jsx";
import "../CreatePostPage/CreatePost.style.css"
import { Editor } from '@tinymce/tinymce-react';

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

    const handleEditorChange = (content) => {
        setForum({
            ...forum, description: content
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
                <div className="form-box">
                    <h1>NUEVO FORO</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Titulo: </label>
                        <input name="title" type="text" onChange={handleChange}></input>
                        {errors.title && <p>{errors.title}</p>}
                        <label htmlFor="description">Añade una descripción</label>
                        <Editor
                            initialValue=""
                            apiKey='4wpwq25gyqkkzwbrabmf4b2733v0g50fepduy2x9rgqx0yp6'
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                        {errors.description && <p>{errors.description}</p>}
                        <button type="submit">Publicar</button>
                        {isUploaded && <p>Se ha subido exitosamente</p>}
                        {errors.submit && <p>{errors.submit}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateForum;
