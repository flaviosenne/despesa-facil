import React from 'react';
import '../CSS/Footer.css';

import facebook from '../icons/facebook.png';
import linkedin from '../icons/linkedin.png';
import github from '../icons/github.png';
import about from '../icons/about.png';

export default Footer => {
    return (
        <>
        <hr className = {window.localStorage.getItem('border')}/>
        <div className="footer">
            <div className="icon-footer">
               <a href = "https://pt-br.facebook.com/flavio.senne"> <img src={facebook} alt="Facebook" /></a>
               <a href = "https://www.linkedin.com/in/joao-flavio-senne"> <img src={linkedin} alt="Linkedin" /></a>
               <a href = "https://github.com/flaviosenne"> <img src={github} alt="Github" /></a>
               <a href="/sobre"> <img src={about} alt="sobre" /></a>
               
            </div>
        </div>
        </>
    )
}