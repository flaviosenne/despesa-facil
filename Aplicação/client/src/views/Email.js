import React, { useEffect, useState } from 'react';

import { useAlert } from 'react-alert'
import {useHistory, Link} from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'

import icon from '../icons/msg-2.png'
import icon_black from '../icons/msg.png'
import icon_m from '../icons/tras.png'
import baseUrl from '../services/URL'
import axios from 'axios'

const props = { icon: icon_m, route: '/login' }
export default Email => {
    const history = useHistory()
    const alert = useAlert()

    const [email, setEmail] = useState('')


    async function sendEmail(e) {
        e.preventDefault()

        const EMAIL = await axios.post(baseUrl+'/send-email', {email})
        .then(data => {
            alert.show('email enviado')

            history.push('/senha')

        })
        .catch(err => {

            alert.show('ops! algo deu errado')
        })   
        
        
    }
    
    return (
        <>
            <Header {...props} />
            <div className='login'>
                <img src={window.localStorage.getItem('theme') == 'dark'?
                icon_black: icon} alt="icone usuario" />
                <p className = 'email'> Insira seu email já cadastradado na base de dados para enviarmos
                    um código de validação para que você possa atualizar sua senha </p>
                <input
                   autoFocus
                    onChange={e => setEmail(e.target.value)}
                    type='text'
                    className = {window.localStorage.getItem('theme')}
                    value={email}
                    id="user"
                    name="user"
                    placeholder = 'Insira seu Email'
                    onKeyDown={e => e.keyCode === 13 ? sendEmail(e): ''} />
                         <Link className = {window.localStorage.getItem('theme') }to="/senha" > Já tenho o código</Link>
                <button className = 'btn' onClick={e => sendEmail(e)}> Enviar </button>
            </div>
        </>
    )
}