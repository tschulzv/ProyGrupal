import { useState } from "react";
import HTTPClient from "../../utils/HTTPClient";
import { useNavigate, Link } from "react-router-dom";

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
                navigate("/");
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
                    <h1>Register</h1>
                    <div className="row">
                        <label htmlFor="name">Name</label>
                        {errors.name && <small>{errors.name}</small>}
                        <input 
                            id="registerName"
                            type="text" 
                            name="name" 
                            value={data.name || ""} 
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="email">Email</label>
                        {errors.email && <small>{errors.email}</small>}
                        <input 
                            id="registerEmail"
                            type="email" 
                            name="email" 
                            value={data.email || ""} 
                            onChange={handleChange}
                            required={true}
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                        {errors.password && <small>{errors.password}</small>}
                        <input 
                            id="registerPassword"
                            type="password" 
                            name="password" 
                            value={data.password || ""} 
                            onChange={handleChange}
                            required={true}
                            minLength={5}
                        />
                    </div>
                <div className="row">
                    <label htmlFor="password">Confirm password</label>
                    {errors.password && <small>{errors.password}</small>}
                    <input 
                        id="registerpassword2"
                        type="password" 
                        name="password2" 
                        value={data.password2 || ""} 
                        onChange={handleChange}
                        required={true}
                        minLength={5}
                    />
                </div>
                <div >
                    <button type="submit" onClick={handleSubmit}>Create Account</button>
                </div>
                    <p>Already have an account? <Link to="/">Log in here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;