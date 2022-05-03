import React, {useState} from 'react'
import {ReactComponent} from "../Tree_swing.svg";
import axios from 'axios';
import './login.scss'
import {Link} from "react-router-dom";

const Login = (props) => {
    const[state, setState] = useState({"username": "", "password" : ""})

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axios({
            method: 'POST',
            url: 'http://localhost/api/users/login',
            data: {
                "username" : state.username,
                "password" : state.password
            }
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("shoppingCart", "");
            localStorage.setItem("tabPrincipal", 0);
            localStorage.setItem("tabAdm", 0);
            localStorage.setItem("tabChat", 0);
            //0 - EN; 1 - RO
            localStorage.setItem("language", 0);
            props.history.push("/loggedin");
            console.log(response);
            }, (error) => {
                console.log(error);
            });
    };

    return (
            <div className="Login">
                <div className="left">
                    <p className="siteName">FARMACY</p>
                    <ReactComponent className="img"/>
                </div>
                <div className="login_form">
                    <p className="Alt">Don't have an acount? <Link to='/register'>Register</Link></p>
                    <p className="FormName">Login</p>
                    <form className="form" onSubmit={handleFormSubmit}>
                        <label>Username: <input required name="Username" onChange={e => setState({...state, username: e.target.value})} value={state.username}/></label>
                        <label>Password: <input required name="Password" type="password" onChange={e => setState({...state, password: e.target.value})} value={state.password}/></label>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        );
}

export default Login
