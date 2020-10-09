import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import {
    listRecep,
    listTotal,
    filtrar,
    remove,
    listExpense,
    ViewUpdateExpense,
    getDateNow
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
    cash: {
        id: null,
        date: '',
        description: '',
        status: '',
        value: null
    },
    expense: [],
    recep: [],
    total: [],
    dates: []
}
// const baseUrl = 'http://104.248.130.44:3001/profile'
const baseUrl = 'http://localhost:3001/profile'

export default class Cash extends Component {
    state = { ...initialState }
    state2 = []
    recep2 = []
    dataInicio = ''
    dataFim = ''
    cont = 0

    async UNSAFE_componentWillMount(cont, indicesDespesa, indicesReceita) {


        await axios(baseUrl, { headers: { 'Authorization': window.localStorage.getItem('user') } }).then(resp => {
            this.setState({ expense: resp.data.expense })
            this.setState({ recep: resp.data.recep })
        })

        console.log(cont)
        if (cont == undefined) {
            this.state2 = []

            var despesa = filtrar(this.state.expense, getDateNow().dateStart, getDateNow().dateEnd)
            var receita = filtrar(this.state.recep, getDateNow().dateStart, getDateNow().dateEnd)
            for (let i = 0; i < despesa.length; i++) {
                this.state2.push(this.state.expense[despesa[i]])
            }
            for (let i = 0; i < receita.length; i++) {
                this.recep2.push(this.state.recep[receita[i]])
            }
            // console.log(despesa)
            window.localStorage.setItem('recep', listRecep(this.recep2).toFixed(2))
            window.localStorage.setItem('expense', listExpense(this.state2).toFixed(2))
            this.UNSAFE_componentWillMount(-1)
        }
        if (cont == 1 || cont == 0) {
            this.state2 = []
            for (let i = 0; i < indicesDespesa.length; i++) {
                this.state2.push(this.state.expense[indicesDespesa[i]])
            }
            this.recep2 = []
            for (let i = 0; i < indicesReceita.length; i++) {
                this.recep2.push(this.state.recep[indicesReceita[i]])
            }
            this.UNSAFE_componentWillMount(-1)
        }
    }

    filtro() {
        const indicesDespesa = filtrar(this.state.expense, this.dataInicio, this.dataFim)
        const indicesReceita = filtrar(this.state.recep, this.dataInicio, this.dataFim)
        this.UNSAFE_componentWillMount(this.cont++, indicesDespesa, indicesReceita)
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
                    <div className="filtro">
                        <Link to="/despesa"><img className="icon" src={incluir} alt="icone incluir" /></Link>
                        <div className='button'>

                            <button className='btn' onClick={() => this.filtro()}>
                                Filtrar
                        </button>
                        </div>
                        <Link to='relatorio'>

                            <img className="icon" src={relatorio} alt="icone incluir" />
                        </Link>
                    </div>

                    <div className='titulo'>

                        <label className={listTotal(this.state2, this.recep2).toFixed(2)[0] == '-' ? "negativo" : 'positivo'}>
                            <p>
                                Total: R$
                        </p>
                            {listTotal(this.state2, this.recep2).toFixed(2)}</label>

                        <label className="receita">
                            <p>
                                Receita: R$
                            </p>
                            {listRecep(this.recep2).toFixed(2)}</label>

                        <label className="despesa">
                            <p>
                                Despesa: R$
                        </p>
                            {listExpense(this.state2).toFixed(2)}</label>
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
                        {this.state2.map(cash => {

                            return (
                                <tr key={cash.id} className={cash.status == 'finalizado' ? 'finalized' : 'pendent'} >
                                    <td>{cash.date}</td>
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
                                            onClick={(e) => {

                                                remove(e, cash.id)
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