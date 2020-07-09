import React, { Component } from 'react';
import { Link } from 'react-router-dom' 
import '../CSS/Login.css';


import Header from '../components/Header'
import icon from '../icons/user.png'

import axios from 'axios'

const baseUrl = "http://localhost:80/user"
const props = {icon, route: '/'}

const initialState = {
    user: {
        id: "",
        name: "",
        user: "",
        password: ''
    }
}


export default class Login extends Component {

    state = { ...initialState}

    async get(e){
        const api = await axios.get(baseUrl)
        
        const user = this.state.user      
        
        
        // usuario do formulario
        var usuario = user.user
        var pass = user.password
        
        
        // validar os campos digitados pelo usuario com os já cadastrados na api
        // usuario da API
        api.data.map(user => {
            if((user.user === usuario) && (user.password === pass)){
                this.state.user.user= user.user
                this.state.user.password = user.password 
    
                // e.pathname é o atributo qu vem no objeto que é recebido como parametro
                return e.pathname = '/home'      
            }             
        })
        
        // console.log(api.data[0].user)
    }
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    render() {
        return (
        <>
        <Header {...props}/>
         <div className = 'login'>
         <img  src = {icon} alt = "icone usuario"/>
         <label> Usuario </label>
         <input 
            onChange = {e => this.updateField(e)}
            value = {this.state.user.user}
            id = "user"
            name = "user"/>

         <label> Senha </label>
         <input
            onChange = {e => this.updateField(e)} 
            value = {this.state.user.password}
            id = "pass"
            name = "password"
            type = "password"/>

        <Link to="/usuario"> Criar Conta</Link>
        <a href = "#/"> Esqueci minha senha</a>
        <Link to ={e => this.get(e)}><button type = 'submit' > Enviar </button></Link>
     </div>
     </>
    )
    }
}