import React from 'react';
import { Link } from 'react-router-dom' 
import '../CSS/Login.css';
import icone from '../icons/user.png'

export default Login => {
    return (
     <div className = 'login'>
         <img  src = {icone} alt = "icone usuario"/>
         <label> Usuario </label>
         <input />

         <label> Senha </label>
         <input type = "password"/>

        <Link to="/usuario"> Criar Conta</Link>
        <a href = "#/"> Esqueci minha senha</a>
        <Link to = "/fluxo-caixa"><button type = 'submit' > Enviar </button></Link>
     </div>
    )
}