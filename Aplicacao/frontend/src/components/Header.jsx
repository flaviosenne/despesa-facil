import React from 'react';
import '../CSS/Header.css';
import { Link } from 'react-router-dom'
export default Header => {
    return (
        <div className = "header">
            <h1 className = "logo">Despesa Facil</h1>
             
            <Link to = {Header.route}>
                <img className = "icon-menu" src={Header.icon} alt="icone home"/>
            </Link>
            
        </div>
    )
}