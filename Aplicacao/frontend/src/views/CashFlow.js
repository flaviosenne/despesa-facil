import React, { Component } from 'react';
import axios from 'axios'
import '../CSS/Cash.css';
import relatorio from '../icons/relatorio.png'
import incluir from '../icons/incluir.png'
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:80/expense'
const initialState = {
    cash: {
        id: null,
        date: '',
        description: '',
        status: '',
        value: null
    },
    list: []
}


export default class CashFlow extends Component {

    state = { ...initialState }

    UNSAFE_componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    render() {
        return (
            <div className="Fluxo">
            <span> Fluxo de Caixa</span>

                <div className="data">

                    <span>de:</span>  <input type='date' />
                </div>
                <div className="data">
                    <span> até: </span> <input type='date' />

                </div>

                <div className="filtro">
                   <Link to ="/despesa"><img className="icon" src={incluir} alt="icone incluir" /></Link>

                    <button type="submit"> Filtrar </button>
                    <img className="icon" src={relatorio} alt="icone incluir" />
                </div>

        <label className="receita"> Receita: {this.total}</label>
            </div>
        )
    }
}