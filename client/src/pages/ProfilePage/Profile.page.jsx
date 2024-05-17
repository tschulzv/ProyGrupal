import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from '../../components/Navbar.component';
import '../../utils/StyleUtils.style.css';
import './ProfilePage.style.css';

const ProfilePage = (props) => {
    const [userData, setUserData] = useState(props.userData || null);
    const [userPosts, setUserPosts] = useState(null);
    const { userId } = useParams();
    const client = new HTTPClient();

    const formatSpecies = (species) => {
        const replaced = species.replace("-", " ");
        const firstLetter = replaced.charAt(0)
        const firstLetterCap = firstLetter.toUpperCase()
        const remainingLetters = replaced.slice(1)
        const capitalizedWord = firstLetterCap + remainingLetters
        return capitalizedWord;
    }
    /*
    useEffect(() => {
        // si ya se le pasa datos de usuario, establecerlos
        if (!props.userData){ 
            console.log("params:", userId);  
            client.getUserById(userId)
                .then(res => {
                    setUserData(res.data);
                    console.log("se encontaron datos del usuario", res.data)
                })
                .catch(err => {
                    console.log("no se encontro el usuario", err)
                })
        } 

        client.getUserPosts(userData.userId)
            .then(res => {
                console.log("se encontaron los posts del usuario", res)
                setUserPosts(res.data.posts);
            })
            .catch(err => {
                console.log("no se encontraron posts del usuario", err)
            })
    },[]);*/
    useEffect(() => {

        if(!props.userData){
    
            console.log("params:", userId);  
            client.getUserById(userId)
                .then(res => {
                    setUserData(res.data);
                    console.log("se encontraron datos del usuario", res.data)
                })
                .catch(err => {
                    console.log("no se encontró el usuario", err)
                })
        } 
    }, [userId, props.userData]);
    
    useEffect(() => {
        if (userData) {
            client.getUserPosts(userData.userId)
                .then(res => {
                    console.log("se encontraron los posts del usuario", res)
                    setUserPosts(res.data.posts);
                })
                .catch(err => {
                    console.log("no se encontraron posts del usuario", err)
                })
        }
    }, [userData]);    

    return (
        <div className="wrapper">
            <Navbar />
            <div className="profile-content">
                {
                    userData && (
                        <>
                            <div className="content-left">
                                <div className="banner">
                                    <img className='banner-avatar' alt="profile" src={userData.profileImage}></img>
                                    <div className="banner-txt">
                                        <h1>{userData.name}</h1>
                                        <p>{userData.bio}</p>
                                    </div>
                                    {
                                        props.editable && <Link to="/settings" className="edit-link">Editar</Link>
                                    }
                                </div>
                                <div className="pics-container">
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <Link to={`/posts/${post._id}`}>
                                                <img key={index} src={post.filename} alt="img" className="user-pic"/>
                                            </Link>
                                        ))
                                    }    
                                </div>
                            </div>
                            <div className="content-right">
                                    <h2>Mis plantas</h2>
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <p key={index}>{formatSpecies(post.species)}</p>
                                        ))
                                    }   
                            </div>  
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default ProfilePage;