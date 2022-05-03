import React, {useState} from 'react'
import {ReactComponent} from '../Tree_swing.svg'
import axios from "axios";
import {Link} from "react-router-dom";
import "./register.scss"

const Register = (props) => {

    const[state, setState] = useState({"username" : "", "email": "", "password" : ""})

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axios({
            method: 'POST',
            url: 'http://localhost/api/users/register',
            data: {
                "username" : state.username,
                "email" : state.email,
                "password" : state.password
            }
        }).then((response) => {
            props.history.push("/login");
            console.log(response);
        }, (error) => {
            console.log(error);
        });

    };

    return (
        <div className="Register">
            <div className="left">
                <p className="siteName">FARMACY</p>
                <ReactComponent className="img"/>
            </div>
            <div className="register_form">
                <p className="Alt">Already have an acount? <Link to='/login'>Login</Link></p>
                <p className="FormName">Create account</p>
                <form className="form" onSubmit={handleFormSubmit}>
                    <label>Username: <input required name="Username" onChange={e => setState({...state, username: e.target.value})} value={state.username}/></label>
                    <label>Email: <input required name="Email" type="email" onChange={e => setState({...state, email: e.target.value})} value={state.email}/></label>
                    <label>Password: <input required name="Password" type="password" onChange={e => setState({...state, password: e.target.value})} value={state.password}/></label>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register
