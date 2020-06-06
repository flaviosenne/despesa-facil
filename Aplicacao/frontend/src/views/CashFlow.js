import React, {  Component } from 'react';
import axios from 'axios'
import '../CSS/Cash.css';
import relatorio from '../icons/relatorio.png'
import incluir from '../icons/incluir.png'

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
var total = 0

export default class CashFlow extends Component {
    
    
    state = { ...initialState }
    
    UNSAFE_componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }
    render() {
        return (
            <div className="Fluxo">
               
                <div>
                    <img className="icon" src={incluir} alt="icone incluir" />

                    <img className="icon" src={relatorio} alt="icone incluir" />
                </div>

                <div>

                de:  <input type='date' />
                até: <input type='date' />

                </div>

                <div className="filtro">
                    <button type="submit"> Filtrar </button>
                </div>

        <label className = "receita"> Receita: {total += parseInt(this.state.list.map(cash => cash.value))}</label>
            </div>
        )
    }
}