import React, {useState} from 'react';
import Header from '../components/Header'
import '../CSS/CreateUser.css';
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import icon from '../icons/user+.png'
import icon_u from '../icons/tras.png'

import axios from 'axios'
import { UserTheme } from '../services/Theme';
import baseURL from '../services/URL'

const props = { icon: icon_u, route: '/login' }
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
            if(pass === password  &&  user.length > 3  
                && (email.split('@').length > 1 && email.split('@')[1] != '')){
             
                await axios.post(baseURL+'/user', { 
                    name, password,
                    email, user
                })
                .then(data => {
                    alert.show(user + ' cadastrado com sucesso')
                    history.push('/login')

                    return
                })
                .catch(err => {
                    
                    alert.show('algo deu errado')
                })
            }else{                
                alert.show('usuario não é valido, observe as credenciais')           
            }
            
        }catch(err){
            console.log(err)
            alert.show('algo deu errado')
        }
    }

    return (
        <>
            <Header {...props} />
            <div  className={UserTheme()}>
                <img src={icon} alt="icone usuario" />
                <label > Nome </label>
                <input autoFocus value = {name} onChange = {e => setName(e.target.value)}/>

                <label > Email </label>
                <input value = {email} onChange = {e => setEmail(e.target.value)}/>

                <label > Usuario </label>
                <input value = {user} onChange = {e => setUser(e.target.value)}/>

                <label > Senha </label>
                <input value = {password} onChange = {e => setPassword(e.target.value)} type="password" />

                <label> Confirmar Senha </label>
                <input value = {pass} onChange = {e => setPass(e.target.value)}type="password" 
                onKeyDown={e => e.keyCode === 13 ? post(e): ''}/>

                <div className = 'button'>

                <Link><button className = 'btn' onClick={e => post(e)} > Cadastrar </button></Link>
                <Link to="/login" ><button className = 'btn' type='submit' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}