import React, { useState } from 'react';
import jwt from 'jsonwebtoken'
import { useAlert } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'
import icon from '../icons/user.png'

import axios from 'axios'

// const baseUrl = "http://104.248.130.44:3001/sessions"
const baseUrl = "http://localhost:3001/sessions"
const props = { icon, route: '/' }
const secret = 'r45g5-l-v5kv50fk254g503;/vtv5-2c2'

export default Login => {
    const alert = useAlert()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    // validar os campos digitados pelo usuario com os já cadastrados na api
    // usuario da API

    function login(e) {

        e.preventDefault()
        try{
            axios.post(baseUrl, {
                user, password
            }).then(data => {
                if (data.status == 200) {
                    
                    window.localStorage.setItem('token', data.data.token)
                    
                    jwt.verify(window.localStorage.getItem('token'), secret, (err, result) => {
                        if (err != null) {
                            alert.show('algo deu errado')
                            console.log(err)
                        }
                        window.localStorage.setItem('id', result.id)
                        window.localStorage.setItem('name', result.name)
                        alert.show('Seja Bem Vindo ' + user)
                        
                    })
                    
                    history.push('/fluxo-caixa')
    
                    return
                }

            }).catch((err) =>{
                alert.show('usuario ou senha incorreta')
            })
        }catch(err){
            console.log(err)
        }       

    }

    return (
        <>
            <Header {...props} />
            <div className='login'>
                <img src={icon} alt="icone usuario" />
                <label> Usuario </label>
                <input
                    onChange={e => setUser(e.target.value)}
                    type='text'
                    className={window.localStorage.getItem('theme')}
                    value={user}
                    id="user"
                    name="user" />

                <label> Senha </label>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className={window.localStorage.getItem('theme')}
                    id="pass"
                    name="password"
                    type="password" />

                <Link className={window.localStorage.getItem('theme')} to="/usuario" > Criar Conta</Link>
                <Link to="/email" className={window.localStorage.getItem('theme')}> Esqueci minha senha</Link>
                <button className='btn' onClick={e => login(e)}> Enviar </button>
            </div>
        </>
    )
}