import React, { Component } from 'react'
import Header from './Header'
import icon from '../icons/relatorio.png'
import '../CSS/Paper.css'
import axios from 'axios'
import { listValueData, formatDateOfServer, listDataPendent, listDataFinalized } from '../services/Methods'
// const baseUrl = 'http://104.248.130.44:3001/profile'
const baseUrl = 'http://localhost:3001'

const props = {
    icon, route: '/fluxo-caixa',
    user: `/usuario/${window.localStorage.getItem('user')}`
}
export default class Report extends Component {
    state = { expenseAPI: [], recepAPI: [] }

    async UNSAFE_componentWillMount() {
        await axios.post(baseUrl + '/profile-expense', {
            headers:
                { 'Authorization': window.localStorage.getItem('user') }
        }
        )
            .then(resp => {
                this.setState({ expenseAPI: resp.data })


            })
        await axios(baseUrl + '/profile-recep', {
            headers:
                { 'Authorization': window.localStorage.getItem('user') }
        }
        )
            .then(resp => {
                this.setState({ recepAPI: resp.data })

            })
        console.log(this.state)

    }

    day = new Date().getDate() < 10
        ? '0' + new Date().getDate() :
        new Date().getDate()

    month = (new Date().getMonth() + 1) < 10
        ? '0' + (new Date().getMonth() + 1) :
        new Date().getMonth() + 1

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

                            <span><strong>Valor Disponível:</strong><br /> R$ {
                                (listValueData(this.state.recepAPI) -

                                listValueData(this.state.expenseAPI)).toFixed(2)}</span>
                            <span>Foi pago {((listDataFinalized(this.state.expenseAPI) /
                                listValueData(this.state.recepAPI)) * 100).toFixed(0)}% <br />do valor da sua receita</span>
                                
                            <span>{((listDataPendent(this.state.expenseAPI) /
                                listValueData(this.state.recepAPI)) * 100).toFixed(0)}% <br />da sua receita já está comprometido</span>
                        </div>
                    </div>

                    <span>
                        <strong>TotalReceitas:</strong><br />
                        R$ {listValueData(this.state.recepAPI)}
                    </span><br />

                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <td>data</td>
                                <td>descrição</td>
                                <td>valor</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.recepAPI.map(recep => {

                                return (
                                    <tr key={recep.id}>
                                        <td>{formatDateOfServer(recep.date)}</td>
                                        <td>{recep.description}</td>
                                        <td>R${recep.value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>

                        <span>
                            <strong>Total Despesas:</strong>
                        R$ {listValueData(this.state.expenseAPI)}
                        </span><br />
                        <span>
                            <strong>Despesas Pendentes:</strong>
                        R$ {listDataPendent(this.state.expenseAPI)}
                        </span><br />

                        <span>
                            <strong>Despesas Pagas:</strong>
                        R$ {listDataFinalized(this.state.expenseAPI)}
                        </span><br />
                    </div>

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
                                return (

                                    <tr key={expense.id}>
                                        <td>{formatDateOfServer(expense.date)}</td>
                                        <td>{expense.description}</td>
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