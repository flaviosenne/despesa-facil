import React from 'react';
import '../CSS/CreateUser.css';
import { Link } from 'react-router-dom'
import icone from '../icons/user.png'

export default User => {
return (
    <div className = 'usuario login'>
        <img  src = {icone} alt = "icone usuario"/>
        <label> Nome </label>
        <input />

        <label> Email </label>
        <input />

        <label> Usuario </label>
        <input />

        <label> Senha </label>
        <input type = "password"/>

        <label> Confirmar Senha </label>
        <input type = "password"/>

       <Link to = "/fluxo-caixa"><button type = 'submit' > Cadastrar </button></Link>
       <Link to = "/" ><button type = 'submit' > Cancelar </button></Link>
    </div>
   )
}