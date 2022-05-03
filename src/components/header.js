import React from 'react'
import './header.scss'
    import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    navigate('/home');

    const logout = () => {
        localStorage.clear();
        navigate.push("/login");
    }

    return (
        <div className='header'>
            <div className='language'>
                <button className='lg' onClick={() => {localStorage.setItem("language", 1); window.location.reload();}}>RO</button>
                <p className='lg'>|</p>
                <button className='lg' onClick={() => {localStorage.setItem("language", 0); window.location.reload();}}>EN</button>
            </div>
            <button className='button' type="button" onClick={logout}>{parseInt(localStorage.getItem("language")) === 0 ? "Logout" : "Iesire"}</button>
            <div className='auth'>
                <div className='child'>{localStorage.getItem("username")}</div>
                <div className='child'>{localStorage.getItem("role")}</div>
            </div>

        </div>
    );
}

export default Header
