import React, { useState, useEffect } from 'react';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from '../../components/Navbar.component';
import '../../utils/StyleUtils.style.css';
import './ProfilePage.style.css';

const ProfilePage = ({userData}) => {
    const [userPosts, setUserPosts] = useState(null);
    //const {id} = userData.userId;
    const client = new HTTPClient();

    useEffect(() => {
        console.log("en perfil, userId:", userData.userId);
        client.getUserPosts(userData.userId)
            .then(res => {
                console.log("se encontaron los posts del usuario", res)
                setUserPosts(res.data.posts);
            })
            .catch(err => {
                console.log("no se encontraron posts del usuario", err)
            })
    },[]);

    const linkToPost = () => {
        // cuando se haceclick sobre la foto se abre el post        
    }

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
                                </div>
                                <div className="pics-container">
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <img key={index} src={post.filename} alt="img" className="user-pic" onClick={linkToPost}/>
                                        ))
                                    }    
                                </div>
                            </div>
                            <div className="content-right">
                                    <h2>Mis plantas</h2>
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <p key={index}>{post.species}</p>
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