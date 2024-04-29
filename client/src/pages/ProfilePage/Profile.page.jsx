import React, { useState, useEffect } from 'react';
//import { verifyToken } from '../../../../server/utils/oauth';
import HTTPClient from '../../utils/HTTPClient';

const ProfilePage = ({userData}) => {
    

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