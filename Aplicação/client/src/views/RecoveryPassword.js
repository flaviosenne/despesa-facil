import React, { useState } from 'react';

import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'

import icon from '../icons/password.png'
import icon_black from '../icons/lock.jpg'
import icon_r from '../icons/tras.png'

import baseUrl from '../services/URL'
import axios from 'axios'

const props = { icon: icon_r, route: '/email' }
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
                <img src={window.localStorage.getItem('theme') == 'dark'?
                icon_black: icon} alt="icone usuario" />
                <label> Código </label>
                <input
                    autoFocus
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
                    type="password"
                    onKeyDown={e => e.keyCode === 13 ? recovery(e): ''}
                     />

                
                <button className = 'btn' onClick={e => recovery(e)}> Enviar </button>
            </div>
        </>
    )
}