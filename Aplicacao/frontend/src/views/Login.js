import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../CSS/Login.css';

import Header from '../components/Header'
import icon from '../icons/user.png'

import axios from 'axios'

const baseUrl = "http://46.101.232.55:80/user"
const props = { icon, route: '/' }

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            password: '',
            link: false
        }
        this.ChangeInput = this.ChangeInput.bind(this)
    }

    setLink(params) {
        this.setState({
            link: params
        })
    }

    async get(e) {
        // e.preventDefault()
        const api = await axios.get(baseUrl)


        // validar os campos digitados pelo usuario com os já cadastrados na api
        // usuario da API
        await api.data.map(user => {
            if ((user.user === this.state.user) && (user.password === this.state.password)) {
                this.state.user = user.user
                this.state.password = user.password

                this.setLink(true)
                return e.pathname = "/home"
            }
        })

    }


    link(e) {
        this.get(e)

    }
    ChangeInput(event) {
        let target = event.target
        let name = target.name
        this.setState({
            [name]: target.value
        })
    }

    render() {
        return (
            <>
                <Header {...props} />
                <div className='login'>
                    <img src={icon} alt="icone usuario" />
                    <label> Usuario </label>
                    <input
                        onChange={this.ChangeInput}
                        type='text'
                        value={this.state.user}
                        id="user"
                        name="user" />

                    <label> Senha </label>
                    <input
                        onChange={this.ChangeInput}
                        value={this.state.password}
                        id="pass"
                        name="password"
                        type="password" />

                    <Link to="/usuario"> Criar Conta</Link>
                    <a href="#/"> Esqueci minha senha</a>
                    <Link to={e => this.link(e)} ><button> Enviar </button></Link>
                </div>
            </>
        )
    }
}