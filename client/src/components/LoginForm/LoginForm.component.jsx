import { useState } from "react";
import HTTPClient from "../../../utils/HTTPClient";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

    //errors : {name: message} donde name es el nombre del campo
    const [errors, setErrors] = useState({})
    const [data, setData] = useState({})
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

        client.login(data.email, data.password)
            .then((response) => {
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
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Login</h1>
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
                {errors.email && <small>{errors.password}</small>}
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
                <button type="submit">Log In</button>
            </div>
        </form>

    </div>
}

export default LoginForm;
