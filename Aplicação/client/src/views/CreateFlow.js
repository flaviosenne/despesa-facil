import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Header from '../components/Header'
import '../CSS/CreateUser.css';

import dinheiro from '../icons/dinheiro.png'
import icon from '../icons/tras.png'
import axios from 'axios'
import { UserTheme } from '../services/Theme';
import baseURL from '../services/URL'

const props = { icon, route: '/fluxo-caixa', 
user: `/usuario/${window.localStorage.getItem('user')}`,
icon_user: '', }

export default User => {
    const [date, setDate] = useState()
    const [type, setType] = useState('')
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [categories, setCategories] = useState([''])
    const [category, setCategory] = useState("não definido")
    const [newCategory, setNewCategory] = useState()
    const [quantity, setQuantity] = useState()

    const history = useHistory()

    useEffect(() => {

        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }

        axios.get(baseURL + '/category/' + window.localStorage.getItem('id'))
            .then(cat => {
                setCategories(cat)
            })

    }, 1)


    const alert = useAlert()
    const post = async (e) => {
        e.preventDefault()


        if (type === 'receita') {
            await axios.post(baseURL + '/flow', {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                date,
                type: 'recep',
                value: Number(value) < 0 ? 0 : Number(value),
                description,
                status,
                quantity: quantity < 0 ? 1 : quantity,
                category: newCategory ? newCategory : category
            })
            alert.show('Receita cadastrada com sucesso')
            history.push('/fluxo-caixa')

        } else {
            axios.post(baseURL + '/flow',
                {
                    token: 'bearer ' + window.localStorage.getItem('token'),
                    authorization: window.localStorage.getItem('id'),
                    date,
                    type: 'expense',
                    value: Number(value) < 0 ? 0 : Number(value),
                    description,
                    status,
                    quantity: quantity < 0 ? 1 : quantity,
                    category: newCategory ? newCategory : category

                }
            ).then(resp => {


                alert.show('Despesa cadastrada com sucesso')
                history.push('/fluxo-caixa')
            }).catch(err => console.log(err))
        }

    }

    return (

        <>
            <Header {...props} />

            <div className={UserTheme()} >
                <img className="dinheiro" src={dinheiro} alt="icone dinheiro" />

                <label> Data </label>
                <input
                    autoFocus
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
                    <select name='category'
                        onChange={e => setCategory(e.target.value)}>
                        <option selected value={"não definido"}>
                            ....
                        </option>
                        {!categories.data ? '' : categories.data.map(cat => {
                            return (
                                <option value={cat.category}
                                >
                                    {cat.category}
                                </option>
                            )
                        })}

                    </select>
                </div>
                <br />
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

                <div>

                    <label> Quantidade de vezes </label>
                    <input
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        type='number' />
                    <label> Valor </label>
                    <input
                        value={value}
                        type="number"
                        onChange={e => setValue(e.target.value)} />
                </div>
                <div className='button'>

                    <Link><button className='btn' onClick={e => post(e)} > Cadastrar </button></Link>
                    <Link to="/fluxo-caixa" ><button className='btn' > Cancelar </button></Link>

                </div>
            </div>
        </>
    )
}