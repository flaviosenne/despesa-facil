import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import Header from '../components/Header'

import {UserTheme} from '../services/Theme'

import axios from 'axios'

import '../CSS/CreateUser.css';

import icon from '../icons/user+.png'
import finger from '../icons/finger.webp'

// const baseURL = 'http://104.248.130.44:3001'
const baseURL = 'http://localhost:3001'
const props = { icon, route: '/home' }
export default UserUpdate => {
    const alert = useAlert()
    
    const [theme, setTheme] = useState('light')
    const [border, setBorder] = useState('border-light')
    const [userTheme, setUserTheme] = useState('usuario-light')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
   
    const history = useHistory()

    function switchTheme(e){
        e.preventDefault()

        window.localStorage.setItem('theme', theme)
        window.localStorage.setItem('border', border)
        window.localStorage.setItem('userTheme', userTheme)
        window.location.reload()
    }

    async function findUser() {

        const id = UserUpdate.match.params.id

        const user = await axios.get(baseURL + '/user/' + id)

        setName(user.data[0].name)
        setEmail(user.data[0].email)
        setUser(user.data[0].user)

        return user.data[0].user
    }
    async function update(e) {

        e.preventDefault()
        try {

            await axios.put(baseURL + '/user/' + UserUpdate.match.params.id, {
                name, 
                email: email.trim().toLowerCase(),
                user: user.trim().toLowerCase()
            })
            alert.show(user + ' atualizado com sucesso')
            window.localStorage.setItem('name', name)
            history.push('/fluxo-caixa')


        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Header {...props} />
            <div onLoad={() => findUser()} className= {UserTheme()}>
                <img src={icon} alt="icone usuario" />
                <label > Nome </label>
                <input value={name} onChange={e => setName(e.target.value)} />

                <label > Email </label>
                <input value={email} onChange={e => setEmail(e.target.value)} />

                <label > Usuario </label>
                <input value={user} onChange={e => setUser(e.target.value)} />
                
                <label> clique na mãozinha para aplicar o tema </label>
                <div className = 'tema'>

                Padrão
                <input onChange = {e => {
                    setTheme('light')
                    setBorder('border-light')    
                    setUserTheme('usuario-light')    
                }   
            }
            name = 'tema'type = 'radio'/>
                
                Escuro
                <input  onChange = {e => {
                    setTheme('dark')
                    setBorder('border-dark')    
                    setUserTheme('usuario-dark')    
                    }   
                }                
                name = 'tema'type = 'radio'/>
                <img src = {finger} className = 'tap' onClick = {e => switchTheme(e)}/>
                </div>


                <div className = 'button'>

                <Link ><button className = 'btn' onClick={e => update(e)} > Atualizar </button></Link>
                <Link to = '/fluxo-caixa'><button className = 'btn' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}