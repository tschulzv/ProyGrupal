import React, { useState, useEffect } from 'react';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from '../../components/Navbar.component';
import '../../utils/StyleUtils.style.css';
import './ProfilePage.style.css';

const ProfilePage = ({userData}) => {
    const [userPosts, setUserPosts] = useState(null);
    const {id} = userData.userId;
    const client = new HTTPClient();

    useEffect(() => {
        client.getUserPosts(id)
            .then(res => {
                setUserPosts(res.posts);
            })
            .catch(err => {
                console.log("no se encontraron posts", err)
            })
    },[]);

    const linkToPost = () => {
        // cuando se haceclick sobre la foto se abre el post        
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                {
                    userData && (
                        <>
                            <div className="banner">
                                <img className='banner-avatar' alt="profile" src={userData.profileImage}></img>
                                <div className="banner-txt">
                                    <h1>{userData.name}</h1>
                                    <p>{userData.bio}</p>
                                </div>
                            </div>
                            <div className="main-content">
                                <div className="pics-container">
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <img key={index} src={post.filepath} alt="img" className="user-pic" onClick={linkToPost}/>
                                        ))
                                    }    
                                </div>
                                <div className="user-plants">
                                    <h2>Mis plantas</h2>
                                    { userPosts &&
                                        userPosts.map((post, index)=> (
                                            <p key={index}>{post.species}</p>
                                        ))
                                    }   
                                </div>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default ProfilePage;