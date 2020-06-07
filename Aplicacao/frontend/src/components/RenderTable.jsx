import React from 'react'
import axios from 'axios'
import alterar from '../icons/alterar.png'
import remover from '../icons/remover.png'
import CashFlow from '../views/CashFlow'

const baseUrl = 'http://localhost:80/expense'

const initialState = {
    cash: {
        id: null,
        date: '',
        description: '',
        status: '',
        value: null
    },
    list: []
}

var total = 0
export default class Table extends CashFlow {

    state = { ...initialState }

    // metodo que irá ser executdo assim que o componente for renderizado
    UNSAFE_componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data})
        })
    }

    clear() {
        this.setState({ cash: initialState.cash })
    }
    
    remove(id){
        axios.delete(`${baseUrl}/${id}`).then(resp => {
            this.get() // assim que deletar o item, o metodo get é chamado para atualizar a pagina
        }).catch(e => console.log(e))
    }
    get() {
        axios.get(baseUrl).then(res => {
            this.setState({ list: res.data})
        })
    }



    // updateField(event) {
    //     const user = { ...this.state.user }
    //     user[event.target.name] = event.target.value
    //     this.setState({ user })
    // }
    // save() {
    //     const user = this.state.user
    //     const method = user.id ? 'put' : 'post'
    //     const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

    //     axios[method](url, user).then(resp => {
    //         const list = this.getUpdatedList(resp.data)
    //         this.setState({ user: initialState.user, list })
    //     })
    // }


    render() {
        return (
            <>
            
                <CashFlow />
                <table >
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
                            {total += cash.value}
                            console.log(total)
                            return (
                                
                                <tr key = {cash._id}>
                                    <td>{cash.date}</td>
                                    <td>{cash.description}</td>
                                    <td>{cash.status}</td>
                                    <td>R${cash.value.toFixed(2)}</td>
                                    <td>

                                        <img 
                                        className="icon" 
                                        // onClick={() => this.load(cash)}
                                        src={alterar}
                                        alt="aletar"></img>
                                        
                                        <img 
                                        className="icon" 
                                        src={remover}
                                        onClick = {() => this.remove(cash._id)}
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