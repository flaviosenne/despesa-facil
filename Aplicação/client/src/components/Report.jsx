import React, { Component } from 'react'
import Header from './Header'
import icon from '../icons/tras.png'
import '../CSS/Paper.css'
import axios from 'axios'
import {
    listExpenseData,
    listRecepData,
    formatDateOfServer,
    listDataPendent,
    listDataFinalized
} from '../services/Methods'
import baseUrl from '../services/URL'

const props = {
    icon, route: '/home', icon_user: '',
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

        console.log('oi')
        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }
        await axios.get(baseUrl + '/flow-expense', {
            headers:
            {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                order: !this.category ? 'date' : this.category
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
                order: !this.category ? 'date' : this.category
            }
        })
            .then(resp => {
                this.setState({ recepAPI: resp.data })
                console.log(resp.data)
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
        
        if (this.category == 'data')  this.category = 'date'
        else if (this.category == 'categoria')  this.category = 'category'
        else if (this.category == 'despesa')  this.category = 'expense'
        else if (this.category == 'receita')  this.category = 'recep'
        this.UNSAFE_componentWillMount()
    }

    render() {
        return (
            <>
                <Header {...props} />
                
                <div className='paper'>
                    <div className='categoria_relatorio'>
                        <select className="form-control" onChange={e => this.category = e.target.value}>

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
               
                    <h1>Relatório Financeiro</h1>
           
                    <div className='cabecalho'>
                        <div className='um'>

                            <span><strong>Autor:</strong> {window.localStorage.getItem('name')}</span>
                            <span><strong>Data:</strong> {this.day + '/' + this.month + '/' + this.year}</span>
                        </div>
                        <div className='dois'>

                            <span><strong>Total Pago:</strong><br /> R$ {
                                (listDataFinalized(this.state.recepAPI) -

                                    listDataFinalized(this.state.expenseAPI)).toFixed(2)}</span>


                            <span>Foi pago {isNaN(
                                (
                                    (listDataFinalized(this.state.expenseAPI) /
                                        listRecepData(this.state.recepAPI))
                                    * 100).toFixed(2)) ? 0 :
                                ((listDataFinalized(this.state.expenseAPI) /
                                    listRecepData(this.state.recepAPI)) * 100).toFixed(2)}% <br />do valor da sua receita total</span>

                            <span>{isNaN((
                                (listDataPendent(this.state.expenseAPI) /
                                    listRecepData(this.state.recepAPI)) * 100).toFixed(2)) ? 0 :
                                (
                                    (listDataPendent(this.state.expenseAPI) /
                                        listRecepData(this.state.recepAPI)) * 100).toFixed(2)

                            }% <br />da receita total <br/>já está comprometido</span>
                        </div>
                    </div>

                    <table className='table'>
                        <thead>
                            <td></td>
                            <td className='underline'>Despesa</td>
                            <td className='underline'>Receita</td>
                        </thead>
                        <tr>
                            <td>Finalizado:</td>
                            <td>R$ {listDataFinalized(this.state.expenseAPI).toFixed(2)}</td>
                            <td>R$ {listDataFinalized(this.state.recepAPI).toFixed(2)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Pendente:</td>
                            <td>R$ {listDataPendent(this.state.expenseAPI).toFixed(2)}</td>
                            <td>R$ {listDataPendent(this.state.recepAPI).toFixed(2)}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Total:</strong></td>
                            <td><strong>R$ {listExpenseData(this.state.expenseAPI).toFixed(2)}</strong></td>
                            <td><strong>R$ {listRecepData(this.state.recepAPI).toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td><strong>Disponível:</strong></td>
                            <td></td>
                            <td>R$ {(listRecepData(this.state.recepAPI) -

                                listExpenseData(this.state.expenseAPI)).toFixed(2)} </td>
                        </tr>
                    </table>

                    <h1>Receitas</h1>
                    <table className={window.localStorage.getItem('theme') == 'dark'
                        ? 'table table-dark table-hover' : 'table table-hover'
                    }>
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
                                        <td>R${recep.value.toFixed(2)}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <h1>Despesas</h1>
                    <table className={window.localStorage.getItem('theme') == 'dark'
                        ? 'table table-dark table-hover' : 'table table-hover'
                    }>
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
                                        <td>R${expense.value.toFixed(2)}</td>
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