import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import axios from 'axios'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'
import { Link } from 'react-router-dom'
import { renderDate } from '../services/API'
import eyes from '../icons/eyesOpen.png'
import eyes2 from '../icons/eyesClose.png'


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

export default class Table extends Component {

    state = { ...initialState }

    state2 = []
    cont = 0
    // metodo que irá ser executado assim que o componente for renderizado
    async UNSAFE_componentWillMount(cont) {
        if(cont == undefined  || cont == 1){
            this.filter()
            await axios(baseUrl).then(resp => {
                this.setState({ list: resp.data })
            })
        }

    }



    filter() {

        if (renderDate() == undefined) {
            //caso o usuario não filtrou por nenhum periodo
            // será renderizado a listagem normal
            return undefined
        }
        else {
            this.state2 = []
            // percorrer o vetor que guarda os dados filtrados
            for (let i = 0; i < renderDate().length; i++) {
                // percorrer todos os ddos
                for (let dadosIndices in this.state.list) {
                    // comparar os indices
                    if (dadosIndices == renderDate()[i]) {
                        // guardar dentro de um array as despesas filtradas
                        this.state2.push(this.state.list[dadosIndices])
                    }

                }
            }
            if(this.state2.length > 0){
                this.UNSAFE_componentWillMount(this.cont++)
                

            }
            renderDate(this.state2)

        }
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

        return data.getDate() + '/' + Number(data.getMonth() + 1) + '/' + data.getFullYear()
    }

    renderTable() {
        if (this.state2.length == 0) {
            return (
                <>
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
                </>
            )
        }
        else {
            return (
                <>
                    <tbody>
                        {this.state2.map(cash => {
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
                </>
            )
        }
    }

    eyes(e){
        e.preventDefault()
        this.UNSAFE_componentWillMount()
    }
    render() {
        return (
            <>
                <table className="table table-hover">

                    <thead>
                            <img  onClick= {(e) => this.eyes(e)} id = 'eyes'className = "icon"src={eyes} alt="eyes"/>
                        <tr>
                            <td>Data Operção</td>
                            <td>Descrição</td>
                            <td>Status</td>
                            <td>Valor</td>
                            <td>Ações</td>
                        </tr>
                    </thead>
                    {this.renderTable()}
                </table>
            </>
        )
    }
}