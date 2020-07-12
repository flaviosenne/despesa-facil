import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import axios from 'axios'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'
import CashFlow from '../views/CashFlow'
import { Link } from 'react-router-dom'

const baseUrl = 'http://46.101.232.55/expense'

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
}

export default class Table extends CashFlow {

    state = { ...initialState }

    // metodo que irá ser executado assim que o componente for renderizado
    async UNSAFE_componentWillMount() {
        await axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })

    }

    remove(id) {
        axios.delete(`${baseUrl}/${id}`).then(resp => {
            this.UNSAFE_componentWillMount() // assim que deletar o item, o metodo UNSAFE_componentWillMount é chamado para atualizar a pagina
        }).catch(e => console.log(e))
    }

    ViewUpdateExpense(id) {

        return '/despesa-update/' + id
    }


    formatDate(date) {

        var data = new Date(date)

        return data.getDate() + '/' + Number(data.getMonth()+1) + '/' + data.getFullYear()
    }

    render() {
        return (
            <>

                <CashFlow />
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
                        {this.state.list.map(cash => {
                            return (

                                <tr key={cash._id}>
                                    <td>{this.formatDate(cash.date)}</td>
                                    <td>{cash.description}</td>
                                    <td>{cash.status}</td>
                                    <td>R${cash.value.toFixed(2)}</td>
                                    <td>

                                        <Link to={this.ViewUpdateExpense(cash._id)}>
                                            <img
                                                className="icon"
                                                src={alterar}
                                                alt="aletar"
                                            />
                                        </Link>


                                        <img
                                            className="icon"
                                            src={remover}
                                            onClick={() => this.remove(cash._id)}
                                            alt="remover" />
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </>
        )
    }
}