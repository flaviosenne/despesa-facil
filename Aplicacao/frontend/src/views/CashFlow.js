import React, { Component } from 'react';

import '../CSS/Cash.css';
import Header from '../components/Header'
import Table from '../components/RenderTable'
import relatorio from '../icons/relatorio.png'
import incluir from '../icons/incluir.png'
import { Link } from 'react-router-dom';

import axios from 'axios'
import {filtrar, listRecep} from '../services/API'
import icon from '../icons/cash.png'
const props = {icon, route: '/home'}

const initialState = {
    cash: {
        id: null,
        date: '',
        description: '',
        status: '',
        value: null
    },
    list: [],
    total: [],
    dates: []
}

const baseUrl = 'http://46.101.232.55:80/expense'


export default class CashFlow extends Component {
    state = { ...initialState }

    dataInicio = ''
    dataFim = ''
    
    async UNSAFE_componentWillMount() {
    
            await axios(baseUrl).then(resp => {
                this.setState({ list: resp.data })
                
            })
            await axios('http://46.101.232.55:80/recep').then(recep => {
                this.setState({total: recep.data})
                listRecep()
            }).catch(err => console.log(err))
    
        }
    
    filtro(e){
        e.preventDefault()
        return filtrar(this.state, this.dataInicio, this.dataFim)
    }

    render() {
        return (
            <>
            <Header {...props}/>
            <div className="Fluxo">
            <span> Fluxo de Caixa</span>

                <div className="data">

                    <span>de:</span>  
                    <input 
                    type='date' 
                    onChange = {e => this.dataInicio = e.target.value}
                    />


                </div>
                <div className="data">
                    <span> até: </span>
                     <input 
                     type='date' 
                     onChange = {e => this.dataFim = e.target.value} 
                     />

                </div>

                <div className="filtro">
                   <Link to ="/despesa"><img className="icon" src={incluir} alt="icone incluir" /></Link>

                    <button onClick ={(e)=> this.filtro(e)}> Filtrar </button>
                    <img className="icon" src={relatorio} alt="icone incluir" />
                </div>

        <label  className="receita"> Receita: R$ {listRecep(this.state).toFixed(2)}</label>
            </div>
            <Table/>
            </>
        )
    }
}