import React, {useState} from 'react';
import Header from '../components/Header'
import '../CSS/CreateUser.css';
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import icon from '../icons/user+.png'

import axios from 'axios'
import { UserTheme } from '../services/Theme';

const baseURL = 'http://localhost:3001'
// const baseURL = 'http://104.248.130.44:3001'
const props = { icon, route: '/login' }
export default User => {

    const alert = useAlert()
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [pass, setPass] = useState('')

    const history = useHistory()

    async function post(e) {

        e.preventDefault()
        try{
            
            if(pass === password  &&  user.length > 3){

                await axios.post(baseURL+'/user', {
               
                    name, email, user, password
                })
                alert.show(user + ' cadastrado com sucesso')
                history.push('/login')
                return
            }
            alert('usuario não é valido, observe as credenciais')           
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Header {...props} />
            <div  className={UserTheme()}>
                <img src={icon} alt="icone usuario" />
                <label > Nome </label>
                <input value = {name} onChange = {e => setName(e.target.value)}/>

                <label > Email </label>
                <input value = {email} onChange = {e => setEmail(e.target.value)}/>

                <label > Usuario </label>
                <input value = {user} onChange = {e => setUser(e.target.value)}/>

                <label > Senha </label>
                <input value = {password} onChange = {e => setPassword(e.target.value)} type="password" />

                <label> Confirmar Senha </label>
                <input value = {pass} onChange = {e => setPass(e.target.value)}type="password" />

                <div className = 'button'>

                <Link><button className = 'btn' onClick={e => post(e)} > Cadastrar </button></Link>
                <Link to="/login" ><button className = 'btn' type='submit' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}