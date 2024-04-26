import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import { useNavigate } from "react-router-dom";

const RegisterForm = (props) => {

    const [data, setData] = useState({})
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const validate = () => {
        let flag = true;
        let errors = {}

        if (data.password.lenght <= 5){
            errors.password = "La password no puede tener menos de 5 caracteres"
            flag = false;
        }

        if (data.password && data.password2 && data.password !== data.password2){
            errors.password = "Las passwords no calzan"
            flag = false;
        }

        //...
        setErrors(errors);
        return flag
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!validate()){
            return
        }

        let client = new HTTPClient();

        client.register(data)
            .then((response) => {
                client.register(data);
                navigate("/home");
            })
            .catch((error) => {
                if (error.response){
                    setErrors(error.response.data.errors)
                }
                console.log(error)
            })
    }

    return <div>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="name">Nombre</label>
                {errors.name && <small>{errors.name}</small>}
                <input 
                    id="name"
                    type="name" 
                    name="name" 
                    value={data.name || ""} 
                    onChange={handleChange}
                    required={true}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                {errors.email && <small>{errors.email}</small>}
                <input 
                    id="email"
                    type="email" 
                    name="email" 
                    value={data.email || ""} 
                    onChange={handleChange}
                    required={true}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                {errors.password && <small>{errors.password}</small>}
                <input 
                    id="password"
                    type="password" 
                    name="password" 
                    value={data.password || ""} 
                    onChange={handleChange}
                    required={true}
                    minLength={5}
                />
            </div>
            <div>
                <label htmlFor="password">Confirme su password</label>
                {errors.password && <small>{errors.password}</small>}
                <input 
                    id="password"
                    type="password" 
                    name="password2" 
                    value={data.password2 || ""} 
                    onChange={handleChange}
                    required={true}
                    minLength={5}
                />
            </div>
            <div>
                <button type="submit">Registro</button>
            </div>
        </form>

    </div>
}

export default RegisterForm;