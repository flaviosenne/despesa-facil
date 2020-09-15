import React, { Component } from 'react'
import Header from './Header'
import icon from '../icons/relatorio.png'
import '../CSS/Paper.css'
import axios from 'axios'
import {listRecep, listExpense }from '../services/Methods'
const baseUrl = 'http://104.248.130.44:3001/profile'
// const baseUrl = 'http://localhost:3001/profile'

const props = {
    icon, route: '/home',
    user: `/usuario/${window.localStorage.getItem('user')}`
}
export default class Report extends Component {
    state = { expenseAPI: [], recepAPI: [] }

    async UNSAFE_componentWillMount() {
        await axios(baseUrl, {
            headers:
                { 'Authorization': window.localStorage.getItem('user') }
        }
        )
            .then(resp => {
                this.setState({ expenseAPI: resp.data.expense })
                this.setState({ recepAPI: resp.data.recep })
            
            })

        }
        
        day = new Date().getDate() < 10
        ? '0' + new Date().getDate() :
        new Date().getDate()
        
        month = (new Date().getMonth() + 1) < 10
        ? '0' + (new Date().getMonth() + 1) :
        new Date().getMonth()
        
        year = new Date().getFullYear()
        

    render() {
        return (
            <>
                <Header {...props} />
                <div className='paper'>

                    <hr className='borda' />
                    <h1>Relatório Financeiro</h1>
                    <hr className='borda' />


                    <div className='cabecalho'>
                        <div className='um'>

                            <span><strong>Autor:</strong> {window.localStorage.getItem('name')}</span>
                            <span><strong>Data:</strong> {this.day + '/' + this.month + '/' + this.year}</span>
                        </div>
                        <div className='dois'>


                            <span><strong>Receitas:</strong><br />
                        R$ {listRecep(this.state.recepAPI)}</span><br />
                            <span><strong>Despesas:</strong><br />
                        R$ {listExpense(this.state.expenseAPI)}</span><br />
                            <span><strong>Total:</strong><br /> R$ {
                            (listRecep(this.state.recepAPI) - 
                            listExpense(this.state.expenseAPI)).toFixed(2)}</span>
                        </div>
                    </div>
                    Despesas
                    <table className='table table-hover'>
                        <thead>
                            <tr>

                                <td>data</td>
                                <td>descrição</td>
                                <td>status</td>
                                <td>valor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.expenseAPI.map(expense => {
                                // this.expense+= expense.value
                                return (

                                    <tr>
                                        <td>{expense.date}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.status}</td>
                                        <td>R${expense.value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>


                    Receita
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>data</td>
                                <td>valor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recepAPI.map(recep => {
                                // this.recep += recep.value
                    
                                return (
                                    <tr>
                                        <td>{recep.date}</td>
                                        <td>R${recep.value}</td>
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