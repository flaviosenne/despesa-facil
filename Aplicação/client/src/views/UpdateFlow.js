import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import Header from '../components/Header'
import '../CSS/CreateUser.css';


import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/cash+.png'
import axios from 'axios'

import { formatDate, formatDateToReact } from '../services/Methods'
import { UserTheme } from '../services/Theme';
const props = { icon, route: '/fluxo-caixa' }

const baseURL = 'http://104.248.130.44:3001'
// const baseURL = 'http://localhost:3001'

export default User => {
    const [date, setDate] = useState()
    const [status, setStatus] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()

    const history = useHistory()


    const list = []
    async function get(e) {
        e.preventDefault()

        const id = User.match.params.id
        await axios.get(baseURL + '/expense/' + id).then(resp => {
            list.push(resp.data[0])
        })

        console.log(list[0].date)
        setDate(formatDateToReact(list[0].date))
        setStatus(list[0].status)
        setDescription(list[0].description)
        setValue(list[0].value)
        return list

    }
    const post = async (e) => {

        const id = User.match.params.id
        e.preventDefault()
        try {

            await axios.put(baseURL + '/expense/' + id, {
                id, date: formatDate(date), 
                value: value.split('-')[0] == ''?0:value,
                description, status
            })
            alert('Despesa atualizada com sucesso')
            
            history.push('/fluxo-caixa')

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header {...props} />
            <div className={UserTheme()} onLoad={e => get(e)}>
                <img className="dinheiro" src={dinheiro} alt="icone dinheiro" />

                <label> Data </label>
                <input
                    value={date}
                    type="date"
                    onChange={e => setDate(e.target.value)} />


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

                <div className='button'>

                    <Link><button className = 'btn' onClick={e => post(e)} > Atualizar </button></Link>
                    <Link to="/fluxo-caixa" ><button className = 'btn' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}