import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import { useAlert } from 'react-alert'
import {useHistory} from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'
import icon from '../icons/msg.png'

import axios from 'axios'

const baseUrl = "http://localhost:3001"
const props = { icon, route: '/' }
export default Email => {
    const history = useHistory()
    const alert = useAlert()

    const [email, setEmail] = useState('')


    function sendEmail(e) {
        e.preventDefault()

        axios.post(baseUrl+'/send-email', {email})

        alert.show('email enviado')
        
        history.push('/senha') 
        
    }

    return (
        <>
            <Header {...props} />
            <div className='login'>
                <img src={icon} alt="icone usuario" />
                <p className = 'email'> Insira seu email já cadastradado na base de dados para enviarmos
                    um código de validação para que você possa atualizar sua senha </p>
                <input
                    onChange={e => setEmail(e.target.value)}
                    type='text'
                    className = {window.localStorage.getItem('theme')}
                    value={email}
                    id="user"
                    name="user"
                    placeholder = 'Insira seu Email' />
                
                <button className = 'btn' onClick={e => sendEmail(e)}> Enviar </button>
            </div>
        </>
    )
}