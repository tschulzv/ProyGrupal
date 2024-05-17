import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../utils/StyleUtils.style.css";
import "./ForumDetails.style.css";
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";

const ForumDetails = ({ userData }) => {
    const { id } = useParams();
    const [forum, setForum] = useState(null);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const client = new HTTPClient('http://localhost:5000'); 

    // Función para cargar los comentarios
    const loadComments = async () => {
        try {
            const response = await client.getForumById(id);
            setForum(response.data.forum);
            setComments(response.data.forum.commentsForum);
        } catch (error) {
            console.error("Error al cargar comentarios:", error);
        }
    };

    useEffect(() => {
        // Llamar a la función para cargar los comentarios cuando cambie el ID del foro
        loadComments();
    }, [id]);

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
            loadComments();
            
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
            <div className="forum-content">
                {forum && (
                    <div className="forum-wrapper">
                        <div className="forum-banner">
                            <h1>{forum.title}</h1>
                            <p>Publicado por <Link to={`/profile/${forum.userId}`} className="forum-user">{forum.userName}</Link></p>
                        </div>
                        <div className="forum-info">
                            <p className="forum-description">Descripción: {forum.description}</p>
                            <h2>Comentarios</h2>
                            {comments.length === 0 ? (
                                <p>No hay comentarios aún.</p>
                            ) : (
                                <ul>
                                    {comments.map(comment => (
                                        <div key={comment._id}>
                                            <p><strong>{comment.userName}:</strong> {comment.text} </p>
                                        </div>
                                    ))}
                                </ul>
                            )}
                            <div className="comment-input">
                                <input placeholder="Escribe un comentario..." name="text" type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                                <button onClick={submitComment}>Publicar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForumDetails;