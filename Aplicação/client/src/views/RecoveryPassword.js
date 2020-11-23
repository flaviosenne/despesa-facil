import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import { useAlert } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'
import icon from '../icons/password.png'
import baseUrl from '../services/URL'
import axios from 'axios'

// const baseUrl = 'http://52.67.74.131:3001'
// const baseUrl = "http://localhost:3001"
const props = { icon, route: '/email' }
export default Recovery => {
    const alert = useAlert()

    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    // validar os campos digitados pelo usuario com os já cadastrados na api
    // usuario da API
   
    function recovery(e) {

        e.preventDefault()

        
        axios.put(baseUrl+'/update-password', {code: token, password})
        alert.show('Password updated')
        history.push('/login')
    }

    return (
        <>
            <Header {...props} />
            <div className='login'>
                <img src={icon} alt="icone usuario" />
                <label> Código </label>
                <input
                    onChange={e => setToken(e.target.value)}
                    type='text'
                    className = {window.localStorage.getItem('theme')}
                    value={token}
                    id="user"
                    name="code" />

                <label> Nova Senha </label>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className = {window.localStorage.getItem('theme')}
                    id="pass"
                    name="password"
                    type="password" />

                
                <button className = 'btn' onClick={e => recovery(e)}> Enviar </button>
            </div>
        </>
    )
}