import {
    useNavigate, 
    Link,
    useParams
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../utils/StyleUtils.style.css";
import "./PostDetails.style.css"
import HTTPClient from "../../utils/HTTPClient";
import Navbar from "../../components/Navbar.component";
import Comment from "../../components/Comment/Comment.component";

const PostDetails = ( {userData} ) => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const [newComment, setNewComment] = useState();
    const client = new HTTPClient();

    useEffect(()=>{
        console.log("POST ID:", id);
        client.getPostById(id)
            .then(res => {
                console.log(`obtenido post id ${id}`, res.data.post)
                setPost(res.data.post)})
            .catch(err => console.log(err));
    },[]);

    const submitComment = (e) => {
        e.preventDefault();
        let comment = {
            "userId" : userData.userId,
            "text" : newComment
        } 
        console.log("se enviará el comentario", comment);
        client.saveComment(id, comment)
            .then(res => {
                console.log("se agrego el comentario a la db");
                post.comments.push(comment);
            })
            .catch(err => { console.log("ERROR:", err)});
    }

    const formatSpecies = (species) => {
        const firstLetter = species.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = species.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters
        return capitalizedWord;
    }

    return (
        <div className="wrapper">
            <Navbar/>
            <div className="content">
                {post && (
                    <div className="detail-wrapper">
                        <img src={post.filename}  alt={`${post.description}`} className="detail-img"></img>
                        <div className="detail-info">
                            <p><Link to={`/profile/${post.userId}`} className="post-user">{post.userId}</Link></p>
                            <p><Link to={`/search/${post.species}`} className="post-species">{formatSpecies(post.species)}</Link></p>
                            <p className="post-description">{post.description}</p>
                            <h2>Comentarios</h2>
                            {(!post.comments || post.comments.length === 0) ? <p>Aún no hay comentarios...</p> :
                                (
                                    //console.log("se mapearan los comentarios", post.comments[0])
                                    post?.comments?.map((comment) => (
                                        <Comment key={comment} id={comment} />
                                    )))
                            }
                            <input name="write-comment" type="text" placeholder="Escribe un comentario" width="250" onChange={(e) => setNewComment(e.target.value)}></input>
                            <button onClick={e => submitComment(e)} className="btn">Publicar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )


}

export default PostDetails;