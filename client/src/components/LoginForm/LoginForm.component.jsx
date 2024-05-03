import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.style.css"

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

    return (
         <div className="container-1">
            <div className="row jutify-content-center">
                <div className="col-4 bg-white">
                    <h1>Login</h1>
                    <div className="row">
                        <label htmlFor="email">Email:</label>
                        <input 
                            id="email"
                            type="email" 
                            name="email" 
                            value={data.email || ""} 
                            onChange={handleChange}
                            required={true} 
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password:</label>
                        <input 
                            id="password"
                            type="password" 
                            name="password" 
                            value={data.password || ""} 
                            onChange={handleChange}
                            required={true}
                            minLength={5} />
                    </div>
                    <div>
                    <button onClick={handleSubmit}>Log in!</button>
                    </div>
                    <p>Don't have an account? <Link to="/register/">Sign up here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;
