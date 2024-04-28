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
        let valErrors = {}

        if (data.password.length <= 5){
            valErrors.password = "La password no puede tener menos de 5 caracteres"
            flag = false;
        }

        if (data.password && data.password2 && data.password !== data.password2){
            valErrors.password = "Las passwords no calzan"
            flag = false;
        }

        //...
        setErrors(valErrors);
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
                console.log("REGISTRO EXITOSO", data);
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
        <form onSubmit={e => handleSubmit(e)}>
        <div>
            
            {errors.name && <small>{errors.name}</small>}
            <input 
                id="registerName"
                type="text" 
                name="name" 
                value={data.name || ""} 
                onChange={e => handleChange(e)}
                required={true}
            />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            {errors.email && <small>{errors.email}</small>}
            <input 
                id="registerEmail"
                type="email" 
                name="email" 
                value={data.email || ""} 
                onChange={(event) => handleChange(event)}
                required={true}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            {errors.password && <small>{errors.password}</small>}
            <input 
                id="registerPassword"
                type="password" 
                name="password" 
                value={data.password || ""} 
                onChange={(event) => handleChange(event)}
                required={true}
                minLength={5}
            />
            </div>
            <div>
                <label htmlFor="password2">Confirme su password</label>
                {errors.password && <small>{errors.password}</small>}
                <input 
                    id="registerpassword2"
                    type="password" 
                    name="password2" 
                    value={data.password2 || ""} 
                    onChange={(event) => handleChange(event)}
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