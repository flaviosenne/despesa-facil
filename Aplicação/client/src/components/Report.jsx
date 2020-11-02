import React, { Component } from 'react'
import Header from './Header'
import icon from '../icons/relatorio.png'
import '../CSS/Paper.css'
import axios from 'axios'
import {
    listExpenseData,
    listRecepData,
    formatDateOfServer,
    listDataPendent,
    listDataFinalized
} from '../services/Methods'
// const baseUrl = 'http://104.248.130.44:3001/profile'
const baseUrl = 'http://localhost:3001'

const props = {
    icon, route: '/fluxo-caixa',
    user: `/usuario/${window.localStorage.getItem('user')}`
}
export default class Report extends Component {
    state = {
        expenseAPI: [], recepAPI: [],
        categories:
            [
                'data',
                'categoria',
                'pendente',
                'finalizado'
            ]
    }
    category


    async UNSAFE_componentWillMount() {

        await axios.get(baseUrl + '/flow-expense', {
            headers:
            {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                order: !this.category ? 'date': this.category
            }
        })
            .then(resp => {
                this.setState({ expenseAPI: resp.data })
            })

            await axios.get(baseUrl + '/flow-recep', {
                headers:
                {
                    token: 'bearer ' + window.localStorage.getItem('token'),
                    authorization: window.localStorage.getItem('id'),
                    order: !this.category ? 'date': this.category
                }
            })
                .then(resp => {
                    this.setState({ recepAPI: resp.data })
                })
    }

    day = new Date().getDate() < 10
        ? '0' + new Date().getDate() :
        new Date().getDate()

    month = (new Date().getMonth() + 1) < 10
        ? '0' + (new Date().getMonth() + 1) :
        new Date().getMonth() + 1

    year = new Date().getFullYear()


    get() {
        if (this.category == 'data') throw this.category = 'date'
        if (this.category == 'categoria') throw this.category = 'category'
        if (this.category == 'despesa') throw this.category = 'expense'
        if (this.category == 'receita') throw this.category = 'recep'
        this.UNSAFE_componentWillMount()
    }
    render() {
        return (
            <>
                <Header {...props} />

                <div className='paper'>
                    <div className='categoria'>
                        <select onChange={e => this.category = e.target.value}>

                            {this.state.categories.map(result => {
                                return (

                                    <option value={result}>
                                        {result}
                                    </option>
                                )
                            })}
                        </select>
                        <button className='btn' onClick={() => this.get()}>
                            Filtrar
                        </button>
                    </div>
                    <hr className='borda' />
                    <h1>Relatório Financeiro</h1>
                    <hr className='borda' />


                    <div className='cabecalho'>
                        <div className='um'>

                            <span><strong>Autor:</strong> {window.localStorage.getItem('name')}</span>
                            <span><strong>Data:</strong> {this.day + '/' + this.month + '/' + this.year}</span>
                        </div>
                        <div className='dois'>

                            <span><strong>Valor Disponível:</strong><br /> R$ {
                                (listRecepData(this.state.recepAPI) -

                                    listExpenseData(this.state.expenseAPI)).toFixed(2)}</span>
                            <span>Foi pago {((listDataFinalized(this.state.expenseAPI) /
                                listRecepData(this.state.recepAPI)) * 100).toFixed(0)}% <br />do valor da sua receita</span>

                            <span>{((listDataPendent(this.state.expenseAPI) /
                                listRecepData(this.state.recepAPI)) * 100).toFixed(0)}% <br />da sua receita já está comprometido</span>
                        </div>
                    </div>
                    <hr />
                    <hr />
                    <table className='table table-bordered'>
                        <thead>
                            <td></td>
                            <td className='underline'>Despesa</td>
                            <td className='underline'>Receita</td>
                        </thead>
                        <tr>
                            <td>Pago:</td>
                            <td>R$ {listDataFinalized(this.state.expenseAPI)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Pendente:</td>
                            <td>R$ {listDataPendent(this.state.expenseAPI)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Total:</strong></td>
                            <td>R$ {listExpenseData(this.state.expenseAPI)}</td>
                            <td>R$ {listRecepData(this.state.recepAPI)} </td>
                        </tr>
                        <tr>
                            <td><strong>Disponível:</strong></td>
                            <td></td>
                            <td>R$ {(listRecepData(this.state.recepAPI) -

                                listExpenseData(this.state.expenseAPI)).toFixed(2)} </td>
                        </tr>
                    </table>

                    <hr />
                    <hr />
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>data</td>
                                <td>descrição</td>
                                <td>categoria</td>
                                <td>status</td>
                                <td>valor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recepAPI.map(recep => {

                                return (
                                    <tr key={recep.id}>
                                        <td>{formatDateOfServer(recep.date)}</td>
                                        <td>{recep.description}</td>
                                        <td>{recep.category}</td>
                                        <td>{recep.status}</td>
                                        <td>R${recep.value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <hr />
                    <hr />
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>data</td>
                                <td>descrição</td>
                                <td>categoria</td>
                                <td>status</td>
                                <td>valor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.expenseAPI.map(expense => {
                                return (

                                    <tr key={expense.id}>
                                        <td>{formatDateOfServer(expense.date)}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.category}</td>
                                        <td>{expense.status}</td>
                                        <td>R${expense.value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </>
        )
    }
}