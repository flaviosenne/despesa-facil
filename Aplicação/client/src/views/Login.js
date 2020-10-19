import React, { useState } from 'react';
import bcrypt from 'bcryptjs'
import { useAlert } from 'react-alert'
import { Link, useHistory } from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'
import icon from '../icons/user.png'

import axios from 'axios'

// const baseUrl = "http://104.248.130.44:3001/sessions"
const baseUrl = "http://localhost:3001/sessions"
const props = { icon, route: '/' }
export default Login => {
    const alert = useAlert()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    // validar os campos digitados pelo usuario com os já cadastrados na api
    // usuario da API
   
    function login(e) {

        e.preventDefault()
        axios.post(baseUrl, {
            user, password
        }).then(data => {
            if(data.status == 200){   
                const hash = 
                bcrypt.compareSync(password, data.data.password)
                
                if(hash){
                    alert.show('login feito com sucesso')

                    window.localStorage.setItem('user', data.data.id)
                    window.localStorage.setItem('name', data.data.name)
                    history.push('/fluxo-caixa')
                    window.location.reload()
                    return
                }  else{
                    return alert('usuario ou senha incorreta')
                }
            }
        }).catch(err => alert('usuario ou senha incorreta'))    
        
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
                    className = {window.localStorage.getItem('theme')}
                    value={user}
                    id="user"
                    name="user" />

                <label> Senha </label>
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className = {window.localStorage.getItem('theme')}
                    id="pass"
                    name="password"
                    type="password" />

                <Link className = {window.localStorage.getItem('theme') }to="/usuario" > Criar Conta</Link>
                {/* <a href="#/" className = {window.localStorage.getItem('theme')}> Esqueci minha senha</a> */}
                <button className = 'btn' onClick={e => login(e)}> Enviar </button>
            </div>
        </>
    )
}