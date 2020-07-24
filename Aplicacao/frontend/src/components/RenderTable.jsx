import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import axios from 'axios'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'
import { Link } from 'react-router-dom'
import { renderDate, filtrar, formatDate } from '../services/API'
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
        if (cont == undefined || cont == 1) {
            this.filter()
            await axios(baseUrl).then(resp => {
                this.setState({ list: resp.data })
            })
            
            // listar despesas cadastradas conforme o dia em que está buscando
            // em um periodo de um mes
            const date = formatDate(new Date()).split('/')
            const start = date[2] + '-' + (date[1] < 10 ? '0' + date[1] : date[1]) + '-' + date[0]
            const end = date[2] + '-' + ((parseInt(date[1]) + 1) < 10 ? '0' + (parseInt(date[1]) + 1) : (parseInt(date[1])) + 1) + '-' + date[0]


            this.state2 = []
            for (let i = 0; i < filtrar(this.state, start, end).length; i++) {
                // percorrer todos os ddos
                for (let dadosIndices in this.state.list) {
                    // comparar os indices
                    if (dadosIndices == filtrar(this.state, start, end)[i]) {
                        // guardar dentro de um array as despesas filtradas
                        this.state2.push(this.state.list[dadosIndices])
                    }

                }
            }
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
            if (this.state2.length > 0) {
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


    renderTable() {
        return (
            <>
                <tbody>
                    {this.state2.map(cash => {
                        return (

                            <tr key={cash._id}>
                                <td>{formatDate(cash.date)}</td>
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
        // }
    }

    // abrir e fechar os olhos da tabela

    eyes(e) {
        e.preventDefault()
        if (e.target.src == 'http://localhost:3000/static/media/eyesClose.1b64e2d8.png') {
            this.img(eyes)
        } else {
            this.img(eyes2)

        }
        this.UNSAFE_componentWillMount()
    }
    aux = eyes2
    img(img) {
        if (img == eyes) {
            this.aux = eyes
        }
        if (img == eyes2) {
            this.aux = eyes2
        }
        return this.aux

    }
    render() {
        return (
            <>
                <table className="table table-hover">
                    <thead>

                        <img onClick={(e) => this.eyes(e)} id='eyes'
                        src={this.img(0)} className="icon" alt="eyes" />
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