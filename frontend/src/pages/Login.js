import React, { useState } from 'react'

import api from '../services/api';

import logo from '../assets/logo.svg';
import './Login.css'

export default function Logon({ history }) {
    const [username, setUsername] = useState('');

    async function handlerSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs',{
            username: username,
        })

        const { _id: id } = response.data;

        history.push(`/dev/${ id }`);
    }

    return(
        <div className="login-container">
            <form onSubmit={handlerSubmit}>
            <img src={logo} alt="Tindev" />
            <input placeholder="Digite seu usuário no Githuh"
            value={username}
            onChange={ e => setUsername(e.target.value)}/>
            <button type="submit">Enviar</button>
            </form>
        </div>
    )
}