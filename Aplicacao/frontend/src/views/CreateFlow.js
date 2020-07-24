import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import Header from '../components/Header'
import '../CSS/CreateUser.css';


import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/cash+.png'
import axios from 'axios'

const props = { icon, route: '/fluxo-caixa' }

export default User => {
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    const post = async (e) => {

        e.preventDefault()
        if (type === 'receita') {
            await axios.post('http://46.101.232.55:80/recep', {
                date, value
            })
            alert('Receita cadastrada com sucesso')
            history.push('/fluxo-caixa')

        } else {
            await axios.post('http://46.101.232.55:80/expense', {
                date, value, description, status
            })
            alert('Despesa cadastrada com sucesso')
            history.push('/fluxo-caixa')

        }
    }
    return (
        <>
            <Header {...props} />
            <div className='usuario login'>
                <img className="dinheiro" src={dinheiro} alt="icone dinheiro" />

                <label> Data </label>
                <input
                    value={date}
                    type="date"
                    onChange={e => setDate(e.target.value)} />

                <label> Tipo </label>
                <div className="tipo">

                    <input
                        value='despesa'
                        type="radio"
                        name="tipo"
                        onChange={e => setType(e.target.value)} />
                    <label >Despesa</label>
                </div>

                <div className="tipo">
                    <input
                        value='receita'
                        type="radio"
                        name="tipo"
                        onChange={e => setType(e.target.value)}
                    />
                    <label >Receita </label>
                </div>

                <label> Descrição </label>
                <input
                    value={description}
                    onChange={e => setDescription(e.target.value)} />


                <label> Status </label>
                <div className="tipo">

                    <input
                        value='pendente'
                        type="radio"
                        name="status"
                        onChange={e => setStatus(e.target.value)} />

                    <label >Pendente</label>
                </div>
                <div className="tipo">
                    <input
                        value='finalizado'
                        type="radio"
                        name="status"
                        onChange={e => setStatus(e.target.value)} />
                    <label >Finalizado </label>
                </div>

                <label> Valor </label>
                <input
                    value={value}
                    type="number"
                    onChange={e => setValue(e.target.value)} />

                <button onClick={e => post(e)} > Cadastrar </button>
                <Link to="/fluxo-caixa" ><button > Cancelar </button></Link>
            </div>
        </>
    )
}