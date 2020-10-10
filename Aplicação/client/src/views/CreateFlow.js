import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'

import Header from '../components/Header'
import '../CSS/CreateUser.css';


import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/cash+.png'
import axios from 'axios'
import { UserTheme } from '../services/Theme';

const props = { icon, route: '/fluxo-caixa' }

const baseURL = 'http://localhost:3001'
// const baseURL = 'http://104.248.130.44:3001'
export default User => {
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [categories, setCategories] = useState([''])
    const [category, setCategory] = useState('')

    const history = useHistory()

    useEffect(() => {
        
        axios.get(baseURL+'/category').then(cat => {
            setCategories(cat)
        })
    
    }, 1)   
        
  
    const post = async (e) => {
        e.preventDefault()

        
        if (type === 'receita') {
            await axios.post(baseURL + '/recep', {
                date,
                value: Number(value) < 0 ? 0 : Number(value),
                description,
                headers: {
                    'Authorization': window.localStorage.getItem('user')
                },
                category
            })
            alert('Receita cadastrada com sucesso')
            history.push('/fluxo-caixa')

        } else {
            axios.post(baseURL + '/expense', {

                headers: {
                    'Authorization': window.localStorage.getItem('user')
                },
                date,
                value: Number(value) < 0 ? 0 : Number(value),
                description,
                status,
                category
                
            }
            ).then(resp => {

                alert('Despesa cadastrada com sucesso')
                history.push('/fluxo-caixa')
            }).catch(err => console.log(err))
        }

    }
    
    return  (
        
        <>
            <Header {...props} />
            <div className={UserTheme() } >
                <img className="dinheiro" src={dinheiro} alt="icone dinheiro" />

                <label> Data </label>
                <input
                    required
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

                <div className='categoria1'>
                    <select name = 'category' 
                    onChange = {e => setCategory(e.target.value)}>
                        <option value = 'não definido'>
                            ....
                        </option>
                        {!categories.data? '': categories.data.map(cat => {
                            return (
                                <option value = {cat.category}
                                >
                                    {cat.category}
                                </option>
                            )
                        })}
                       
                    </select>
                </div>
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

                    <Link><button className='btn' onClick={e => post(e)} > Cadastrar </button></Link>
                    <Link to="/fluxo-caixa" ><button className='btn' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}