import React from 'react'
import logo from '../assets/logo.svg';
import './Login.css'

export default function Logon() {
    return(
        <div className="login-container">
            <form>
            <img src={logo} alt="Tindev" />
            <input placeholder="Digite seu usuário no Githuh"/>
            <button type="submit">Enviar</button>
            </form>
        </div>
    )
}