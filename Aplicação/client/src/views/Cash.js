import React, { Component } from 'react';


import { Link } from 'react-router-dom';
import axios from 'axios'

import {
    formatDateOfServer,
    remove,
    ViewUpdateExpense,
    listExpenseData,
    listRecepData
} from '../services/Methods'

import baseUrl from '../services/URL'
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
    cash: [],
    categories: [],
}

// const baseUrl = 'http://localhost:3001'
// const baseUrl = 'http://52.67.74.131:3001'

export default class Cash extends Component {
    state = { ...initialState }
    dataInicio 
    dataFim 
    cont = 0
    category 
    type

    async UNSAFE_componentWillMount() {
        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }

        await axios.get(baseUrl + '/flow',
            {
                headers:
                {
                    token: 'bearer ' + window.localStorage.getItem('token'),
                    authorization: window.localStorage.getItem('id'),
                        dateStart: this.dataInicio,
                        dateEnd: this.dataFim, 
                        category: this.category == '...'? undefined: this.category,
                        // type: this.type
                }

            }).then(cash => {
                this.setState({ cash: cash.data })
            })
            .catch(err => {
                console.log(err)
                // alert('necessário fazer login')
                // this.props.history.push("/login");
            })

        await axios.get(baseUrl + '/category/'+window.localStorage.getItem('id'))
        .then(cat => {
            this.setState({ categories: cat.data })
        })

    }

    get() {
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
                                ...
                            </option>
                            {this.state.categories.map(result => {
                                return (
                                    <option value={result.id}>
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

                        <label className={(listRecepData(this.state.cash) 
                            - listExpenseData(this.state.cash)).toFixed(2) < 0? "negativo" : 'positivo'}>
                            <p>
                                Total: R$
                        </p>
                            {(listRecepData(this.state.cash) 
                            - listExpenseData(this.state.cash)).toFixed(2)}</label>

                        <label className="receita">
                            <p>
                                Receita: R$
                            </p>
                            {listRecepData(this.state.cash).toFixed(2)}</label>

                        <label className="despesa">
                            <p>
                                Despesa: R$
                        </p>
                            {listExpenseData(this.state.cash).toFixed(2)}</label>
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
                        {this.state.cash.map(cash => {

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
                                            onClick={async (e) => {

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