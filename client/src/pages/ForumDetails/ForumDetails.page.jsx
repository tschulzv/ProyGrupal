import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../utils/StyleUtils.style.css";
import "./ForumDetails.style.css";
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";
import { Editor } from '@tinymce/tinymce-react'; // Importa Editor de TinyMCE

const ForumDetails = ({ userData }) => {
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [newComment, setNewComment] = useState(""); // Contenido HTML del nuevo comentario
    const [comments, setComments] = useState([]);
    const client = new HTTPClient('http://localhost:5000'); 
    
    // Función para cargar los comentarios
    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await client.getForumById(id);
                setForum(response.data.forum);
                setComments(response.data.forum.commentsForum);
            } catch (error) {
                console.error("Error al cargar comentarios:", error);
            }
        };
        // Llamar a la función para cargar los comentarios cuando cambie el ID del foro
        loadComments();
    }, [id]);

    // Función para manejar los cambios en el editor de TinyMCE
    const handleEditorChange = (content) => {
        setNewComment(content);
    };

    const submitComment = async (e) => {
        e.preventDefault();
        
        // Verificar si userData está definido y contiene userId
        if (!userData || !userData.userId) {
            console.error("No se pudo enviar el comentario: userData no está definido o no contiene userId.");
            return;
        }
        
        // Crear el objeto de comentario
        const comment = {
            forumId: id,
            userId: userData.userId, // Utilizar userData.userId
            userName: userData.name,
            text: newComment
        };

        try {
            // Enviar el comentario al servidor utilizando el cliente HTTP
            await client.createComment(comment);
            
            // Limpiar el campo de comentario después de enviarlo con éxito
            setNewComment("");
            
            // Volver a cargar los comentarios para reflejar el nuevo comentario
            const response = await client.getForumById(id);
            setComments(response.data.forum.commentsForum);
            
            // Opcionalmente, puedes realizar cualquier otra acción después de enviar el comentario con éxito
            console.log("Comentario enviado con éxito.");
        } catch (error) {
            // Capturar y manejar cualquier error que pueda ocurrir durante la solicitud
            console.error("Error al enviar el comentario:", error);
        }
    };

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                {forum && (
                    <div className="forum-wrapper">
                        <div className="forum-banner">
                            <h1>{forum.title}</h1>
                            <p>Publicado por <Link to={`/profile/${forum.userId}`} className="forum-user">{forum.userName}</Link></p>
                        </div>
                        <div className="forum-info">
                            <p className="forum-description" dangerouslySetInnerHTML={{ __html: forum.description }}></p>
                            <h2>Comentarios:</h2>
                            {comments.length === 0 ? (
                                <p>No hay comentarios aún.</p>
                            ) : (
                                <ul>
                                    {comments.map(comment => (
                                        <div className="comment-box" key={comment._id}>
                                            <p><strong>{comment.userName}:</strong><p dangerouslySetInnerHTML={{ __html: comment.text }}></p></p>
                                        </div>
                                    ))}
                                </ul>
                            )}
                            <label htmlFor="text">Escribe un comentario...</label>
                            <Editor
                                apiKey='4wpwq25gyqkkzwbrabmf4b2733v0g50fepduy2x9rgqx0yp6'
                                initialValue=""
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
                            <button className="btn-comment" onClick={submitComment}>Publicar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumDetails;


