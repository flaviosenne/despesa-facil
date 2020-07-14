import React, {useState} from 'react';
import Header from '../components/Header'
import '../CSS/CreateUser.css';
import { Link, useHistory } from 'react-router-dom'
import icon from '../icons/user+.png'


import axios from 'axios'

const props = { icon, route: '/login' }
export default User => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [pass, setPass] = useState('')

    const history = useHistory()

    async function post(e) {

        e.preventDefault()
        try{
            
            console.log(name, email, password, user)
            if((pass == password)  &&  (user.length > 3)){

                await axios.post('http://46.101.232.55:80/user', {
                    name, email, user, password
                })
                alert(user + ' cadastrado com sucesso')
                history.push('/login')
            }
            
            
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <Header {...props} />
            <div className='usuario login'>
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

                <Link ><button onClick={e => post(e)} > Cadastrar </button></Link>
                <Link to="/login" ><button type='submit' > Cancelar </button></Link>
            </div>
        </>
    )
}