import React from 'react';

import '../CSS/Cash.css';

import relatorio from '../icons/relatorio.png'
import incluir from '../icons/incluir.png'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'


export default CashFlow => {
    return (
        <div className = "Fluxo">

        <div>
            {/* <button className = 'btn'type = "submit"> */}
                <img className = "icon"src = {incluir}/>
            {/* </button> */}
            {/* <button type = "submit" className = 'btn'> */}
            <img className = "icon"src = {alterar}/>
            {/* </button> */}
            {/* <button type = "submit" className = 'btn'> */}
            <img className = "icon"src = {remover}/>
            {/* </button> */}
            {/* <button type = "submit" className = 'btn'> */}
            <img className = "icon"src = {relatorio}/>
            {/* </button> */}
        </div>

        <div>
          de:  <input type = 'date'/>
          até: <input type = 'date'/>
        </div>
    
        <div className = "filtro">
            <button type = "submit"> Filtrar </button>
        </div>
             <label> Receita: R$985.32</label> 


        </div>
    )
}