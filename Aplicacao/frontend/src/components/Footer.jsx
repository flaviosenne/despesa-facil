import React from 'react';
import '../CSS/Footer.css';

import facebook from '../icons/facebook.png';
import linkedin from '../icons/linkedin.png';
import github from '../icons/github.png';

export default Footer => {
    return (
        <div className="footer">
            <div>
            <h1 className="logo">Despesa Facil</h1>
                <ul>
                    <a href="/sobre">
                        <li>   Sobre</li>
                    </a> 
                    <a href="#">
                    <li className = "ling">   Linguagem</li>
                        <li className = "por"> Portugues </li>
                        <li className = "ing"> English </li>
                        <li className = "esp"> Español </li>
                    </a>
                </ul>
            </div>
            <div className="icon-footer">
               <a href = "https://pt-br.facebook.com/flavio.senne"> <img src={facebook} alt="" /></a>
               <a href = "https://www.linkedin.com/in/joao-flavio-senne-65b28a161"> <img src={linkedin} alt="" /></a>
               <a href = "https://github.com/flaviosenne"> <img src={github} alt="" /></a>
            </div>
        </div>
    )
}