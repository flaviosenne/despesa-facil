import React from 'react';
import '../CSS/CreateUser.css';
import icone from '../icons/user.png'

export default User => {
return (
    <div className = 'usuario login'>
        <img  src = {icone}/>
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

       <button type = 'submit' > Cadastrar </button>
       <button type = 'submit' > Cancelar </button>
    </div>
   )
}