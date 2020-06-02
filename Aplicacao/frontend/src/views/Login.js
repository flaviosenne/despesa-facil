import React from 'react';
import '../CSS/Login.css';
import icone from '../icons/user.png'

export default Login => {
    return (
     <div className = 'login'>
         <img  src = {icone}/>
         <label> Usuario </label>
         <input />

         <label> Senha </label>
         <input type = "password"/>

        <a> Criar Conta</a>
        <a> Esqueci minha senha</a>
        <button type = 'submit' > Enviar </button>
     </div>
    )
}