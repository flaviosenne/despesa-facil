import React, { Component } from 'react';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios'

import {
    formatDateOfServer,
    listTotal,
    remove,
    ViewUpdateExpense,
    listValueData
} from '../services/Methods'

import Header from '../components/Header'

import relatorio from '../icons/relatorio.png'
import incluir from '../icons/incluir.png'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'
import icon from '../icons/cash.png'
import icon_user from '../icons/config.png'

import '../CSS/Cash.css';

const props = {
    icon, route: '/home',
    user: `/usuario/${window.localStorage.getItem('user')}`,
    icon_user,
}

const initialState = {
    expense: [],
    recep: [],
    categories: [],
}
// const baseUrl = 'http://104.248.130.44:3001'
const baseUrl = 'http://localhost:3001'

export default class Cash extends Component {
    state = { ...initialState }
    dataInicio 
    dataFim
    cont = 0
    category = undefined

    async UNSAFE_componentWillMount(){
            
            await axios.post(baseUrl+'/profile-expense', {
                headers: {Authorization: window.localStorage.getItem('user')},
                    dateStart: this.dataInicio,
                    dateEnd: this.dataFim,
                    category: this.category
            }).then(expense => {
                this.setState({expense: expense.data})
            })
            
            await axios.get(baseUrl+'/profile-recep', {
                headers: {Authorization: window.localStorage.getItem('user')}
            }).then(recep => {
                this.setState({recep: recep.data})
            })
            
            await axios.get(baseUrl+'/category').then(cat => {
                this.setState({categories: cat.data})
            })

    }

    get(){        
        this.UNSAFE_componentWillMount()
    }

     
    render() {
        return (
            <>
                <Header {...props} />
                <div className="Fluxo">
                    <span> Fluxo de Caixa</span>
                    <div className="data">
                        <span>de:</span>
                        <input
                            type='date'
                            className={window.localStorage.getItem('theme')}
                            onChange={e => this.dataInicio = e.target.value}
                        />
                    </div>
                    <div className="data">
                        <span> até: </span>
                        <input
                            type='date'
                            className={window.localStorage.getItem('theme')}
                            onChange={e => this.dataFim = e.target.value}
                        />

                    </div>
                    <div className='categoria'>
                        <select onChange={e => this.category = e.target.value}>
                            <option 
                                value={undefined}>
                                {undefined}
                            </option>
                            {this.state.categories.map(result => {
                                return (
                                    <option value={result.category}>
                                        {result.category}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="filtro">
                        <Link to="/despesa"><img className="icon" src={incluir} alt="icone incluir" /></Link>
                        <div className='button'>

                            <button className='btn' onClick={() => this.get()}>
                                Filtrar
                        </button>
                        </div>
                        <Link to='relatorio'>

                            <img className="icon" src={relatorio} alt="icone incluir" />
                        </Link>
                    </div>

                    <div className='titulo'>

                        <label className={listTotal(this.state.expense, this.state.recep).toFixed(2)[0] == '-' ? "negativo" : 'positivo'}>
                            <p>
                                Total: R$
                        </p>
                            {listTotal(this.state.expense, this.state.recep).toFixed(2)}</label>

                        <label className="receita">
                            <p>
                                Receita: R$
                            </p>
                            {listValueData(this.state.recep).toFixed(2)}</label>

                        <label className="despesa">
                            <p>
                                Despesa: R$
                        </p>
                            {listValueData(this.state.expense).toFixed(2)}</label>
                    </div>
                </div>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>Data Operção</td>
                            <td>Descrição</td>
                            <td>Status</td>
                            <td>Valor</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.expense.map(cash => {

                            return (
                                <tr key={cash.id} className={cash.status == 'finalizado' ? 'finalized' : 'pendent'} >
                                    <td>{formatDateOfServer(cash.date)}</td>
                                    <td>{cash.description}</td>
                                    <td>{cash.status}</td>
                                    <td>R${cash.value.toFixed(2)}</td>
                                    <td>
                                        <Link to={ViewUpdateExpense(cash.id)}>
                                            <img
                                                className="icon"
                                                src={alterar}
                                                alt="aletar"
                                            />
                                        </Link>
                                        <img
                                            onClick={ async (e) => {

                                                await remove(e, cash.id)
                                                this.UNSAFE_componentWillMount()
                                            }}
                                            className="icon"
                                            src={remover}
                                            alt="remover"
                                        />
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </>
        )
    }
}