import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HTTPClient from '../../utils/HTTPClient';
import Navbar from "../../components/Navbar.component.jsx";
import '../../utils/StyleUtils.style.css';
import '../CreatePostPage/CreatePost.style.css'

const UpdateProfile = (props) => {
    const [userData, setUserData] = useState(props.userData || {});
    const [file, setFile] = useState();
    const [errors, setErrors] = useState({});
    const [isUploaded, setIsUploaded] = useState(false);
    const client = new HTTPClient();
    const id = userData.userId ? userData.userId : '';
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('bio', userData.bio);
        if (file) {
            formData.append('profileImage', file);
        }
        
        try {
            const res = await client.updateUser(id, formData);
            console.log(res);
            setIsUploaded(true);
            console.log("Perfil actualizado con éxito", res);
            setTimeout(() => {
                navigate("/home");
            }, 2000);
        } catch (err) {
            console.error("(frontend)Error al actualizar el perfil:", err);
        }
    }

    const validate = () => {
        let flag = true;
        if (!userData.name) {
            setErrors(prev => ({ ...prev, name: "El nombre es requerido" }));
            flag = false;
        }
        if (!userData.bio) {
            setErrors(prev => ({ ...prev, bio: "La biografía es requerida" }));
            flag = false;
        }
        return flag;
    }

    return (
        <div className="wrapper">
            <Navbar />
            <div className="content">
                <div className="form-box">
                    <h1>ACTUALIZAR PERFIL</h1>
                    <form encType="multipart/form-data">
                        <label htmlFor="name">Nombre</label>
                        <input name="name" type="text" value={userData.name || ''} onChange={handleChange}></input>
                        <label htmlFor="profileImage">Selecciona una imagen de perfil</label>
                        <input name="profileImage" type="file" accept="image/png, image/jpeg" onChange={handleFileChange}></input>
                        <img src={userData.profileImage} alt="Imagen de perfil" style={{ maxWidth: "100%", height: "auto" }} />
                        <label htmlFor="bio">Biografía</label>
                        <input name="bio" type="text" value={userData.bio || ''} onChange={handleChange}></input>
                        <button type="submit" onClick={handleSubmit}>Guardar Cambios</button>
                        {isUploaded && <p>El perfil se ha actualizado exitosamente</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;
