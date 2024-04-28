import React, { useState, useEffect } from 'react';
//import { verifyToken } from '../../../../server/utils/oauth';
import HTTPClient from '../../utils/HTTPClient';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const client = new HTTPClient();

    useEffect(() => {

        client.getUserData()
            .then(res => {
                setUserData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    return (
        <div>
            <h1>Perfil</h1>
            {
                userData && (
                    <>
                        <p>Nombre: {userData.name}</p>
                        <p>Biografia: {userData.bio}</p>
                    </>
                )
            }
        </div>
    )
}

export default ProfilePage;