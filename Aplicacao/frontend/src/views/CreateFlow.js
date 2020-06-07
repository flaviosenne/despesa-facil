import React from 'react';
import '../CSS/CreateUser.css';
import { Link } from 'react-router-dom'
import dinheiro from '../icons/dinheiro.png'

export default User => {
return (
    <div className = 'usuario login'>
        <img  className = "dinheiro"src = {dinheiro} alt = "icone dinheiro"/>
        <label> Data </label>
        <input  type = "date"/>

        <label> Tipo </label>
    <div className = "tipo">

        <input type ="radio" name = "tipo" /> <label >Despesa</label>
    </div>
    <div className = "tipo">
        <input type ="radio" name= "tipo"/> <label >Receita </label>
    </div>

        <label> Descrição </label>
        <input />

        <label> Status </label>
    <div className = "tipo">

        <input type ="radio" name = "tipo" /> <label >Pendente</label>
    </div>
    <div className = "tipo">
        <input type ="radio" name= "tipo"/> <label >Finalizado </label>
    </div>

        <label> Valor </label>
        <input type = "number"/>

       <Link to = "/fluxo-caixa"><button type = 'submit' > Cadastrar </button></Link>
       <Link to = "/" ><button > Cancelar </button></Link>
    </div>
   )
}