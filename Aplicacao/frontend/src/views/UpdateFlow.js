import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import Header from '../components/Header'
import '../CSS/CreateUser.css';


import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/cash+.png'
import axios from 'axios'


const props = { icon, route: '/fluxo-caixa' }


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
        await axios.get('http://46.101.232.55:80/expense/'+id).then(resp => {
           list.push(resp.data)
    })
    
        setDate(list[0].date)
        setStatus(list[0].status)
        setDescription(list[0].description)
        setValue(list[0].value)
        return list
                
    }

    const post = async (e) => {

        console.log(date, description, value, status)
        const _id = User.match.params.id 
        e.preventDefault()
        try {
                await axios.put('http://46.101.232.55:80/expense', {
                    _id, date, value, description, status
                })
                alert('Despesa atualizada com sucesso')
                history.push('/fluxo-caixa')

            }
        catch (err) {
            console.log(err)
        }
    }
    function formatDate(date) {

        var data = new Date(date)

        var year = data.getFullYear()
        var month = ((data.getMonth() < 10)? '0'+ data.getMonth(): data.getMonth())
        var day = data.getDate()

        return  year +'-' + month + '-' + day
    }
    return (
        <>
            <Header {...props} />
            <div className='usuario login' onLoad = {e => get(e)}>
                <img className="dinheiro" src={dinheiro} alt="icone dinheiro" />
               
                <label> Data </label>
                <input
                    value={formatDate(date)}
                    type="date" 
                    onChange = {e => setDate(e.target.value)}/>

               
                <label> Descrição </label>
                <input
                    value={description} 
                    onChange = {e => setDescription(e.target.value)}/>

              
                <label> Status </label>
                <div className="tipo">

                    <input
                        value='pendente' 
                        type="radio" 
                        name="status" 
                        onChange = {e => setStatus(e.target.value)}/> 
                        
                        <label >Pendente</label>
                </div>
                <div className="tipo">
                    <input
                        value='finalizado' 
                        type="radio" 
                        name="status"
                        onChange = {e => setStatus(e.target.value)} /> 
                        <label >Finalizado </label>
                </div>

                <label> Valor </label>
                <input
                    value={value} 
                    type="number"
                    onChange = {e => setValue(e.target.value)} />

                <button onClick={e => post(e)} > Atualizar </button>
                <Link to="/fluxo-caixa" ><button > Cancelar </button></Link>
            </div>
        </>
    )
}