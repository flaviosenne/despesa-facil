import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'

import { useAlert } from 'react-alert'
import Header from '../components/Header'
import '../CSS/CreateUser.css';
import baseURL from '../services/URL'

import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/tras.png'
import axios from 'axios'


import { UserTheme } from '../services/Theme';
const props = { icon, route: '/fluxo-caixa' }


export default User => {
    const [date, setDate] = useState()
    const [status, setStatus] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState()
    
    const history = useHistory()
    const alert = useAlert()
    
    const list = []
    const get = async(e) => {
        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }
        
        axios.get(baseURL+'/category/'+window.localStorage.getItem('id'))
        .then(cat => {
            setCategories(cat.data)
        })
        
        const id = User.match.params.id
        await axios.get(baseURL + '/flow/' + id, {
            headers: {
                token: 'bearer '+ window.localStorage.getItem('token')}
        }).then(resp => {
            list.push(resp.data)
        })
        
        setDate(list[0].date)
        setStatus(list[0].status)
        setDescription(list[0].description)
        setValue(list[0].value)
        setCategory(list[0].category)
        
        return list
    }

   
    const post = async (e) => {

        const id = User.match.params.id
        e.preventDefault()
        try {
           
            await axios.put(baseURL + '/flow/' + id, {
                authorization: window.localStorage.getItem('id'),
                token: 'bearer '+window.localStorage.getItem('token'),
                id, date,
                value: Number(value) < 0 ? 0 : Number(value),
                description, status, 
                category: !newCategory ? category: newCategory
            })
            alert.show('Despesa atualizada com sucesso')

            history.push('/fluxo-caixa')

        }
        catch (err) {
            console.log(err)
        }    
        
    }

    return (
        <>
            <Header {...props} />
            <div className={UserTheme()} onLoad = {e => get(e)}>
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
                
                <div className='categoria1'>
                    <select name = 'category' 
                    onChange = {e => setCategory(e.target.value)}>
                        <option value = "não definido">
                            ....
                        </option>
                        {!categories ? '': categories.map(cat => {
                            return (
                                <option 
                                selected = {cat.id == category} 
                                value = {cat.category}>
                                    {cat.category}
                                </option>
                            )
                        })}
                       
                    </select>
                </div>
                <label> Adicione Nova Categoria Caso Nescessário</label>
                <input
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)} />

                <label> Status </label>
                <div className="tipo">

                    <input
                        value='pendente'
                        type="radio"
                        name="status"
                        checked = {status == 'pendente'}
                        onChange={e => setStatus(e.target.value)} />

                    <label >Pendente</label>
                </div>
                <div className="tipo">
                    <input
                        value='finalizado'
                        checked = {status == 'finalizado'}
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

                    <Link><button className='btn' onClick={e => post(e)} > Atualizar </button></Link>
                    <Link to="/fluxo-caixa" ><button className='btn' > Cancelar </button></Link>
                </div>
            </div>
        </>
    )
}