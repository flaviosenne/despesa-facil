import React from 'react';
import '../CSS/Header.css';
import menu from '../icons/menu.png';

export default Header => {
    return (
        <div className = "header">
            <h1 className = "logo">Despesa Facil</h1>
            <img className = "icon-menu" src={menu} alt=""/>
        </div>
    )
}