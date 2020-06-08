import React from 'react';
import Header from '../components/Header'
import '../CSS/CreateUser.css';
import { Link } from 'react-router-dom'
import icon from '../icons/user+.png'

const props = { icon, route: '/login' }
export default User => {
    return (
        <>
            <Header {...props} />
            <div className='usuario login'>
                <img src={icon} alt="icone usuario" />
                <label> Nome </label>
                <input />

                <label> Email </label>
                <input />

                <label> Usuario </label>
                <input />

                <label> Senha </label>
                <input type="password" />

                <label> Confirmar Senha </label>
                <input type="password" />

                <Link to="/home"><button type='submit' > Cadastrar </button></Link>
                <Link to="/" ><button type='submit' > Cancelar </button></Link>
            </div>
        </>
    )
}