import React, { Component } from 'react';
import { Bar, Pie } from 'react-chartjs-2'
import Header from './Header'
import axios from 'axios'
import icon from '../icons/tras.png'
import baseUrl from '../services/URL'
import '../CSS/Cash.css'
import '../CSS/Chart.css'
const props = {
    icon, route: '/home', icon_user: '',
    user: `/usuario/${window.localStorage.getItem('user')}`
}
export default class Chart extends Component {

    dateStart
    dateEnd
    datas
    categories = []
    values = []
    colors = []
    type = 'bar'

    async UNSAFE_componentWillMount() {
        this.categories = []
        this.values = []
        this.colors = []
     
        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }
        
        await axios.get(baseUrl + '/chart', {
            headers:
            {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                dateStart: this.dateStart,
                dateEnd: this.dateEnd,
            }
        })
            .then(resp => {
                this.datas = (resp.data)
            })

        this.filterCategories(this.datas.categories)
        this.filterValues(this.datas.frequency)
        this.filterColors(this.datas.colors)
    }
    getDatas() {
        this.UNSAFE_componentWillMount()
        this.chart()
    }

    filterCategories(categories) {
        categories.forEach(category => {
            this.categories.push(category)
        })
    }

    filterColors(colors) {
        colors.forEach(color => {
            this.colors.push(color)
        })
    }
    filterValues(values) {
        values.forEach(value => {
            this.values.push(value)
        })
    }
    chart(){
        console.log(this.type)
        if(this.type == 'bar'){
            return(
                <Bar data={{
                    labels: this.categories,
                    datasets: [
                        {
                            label: 'Categorias',
                            data: this.values,
                            borderWidth: 4,
                            backgroundColor: this.colors
                        }
                    ]
                }} />
            )
        }
        if(this.type == 'pie'){
            return(
            <Pie data={{
                labels: this.categories,
                datasets: [
                    {
                        label: 'Categorias',
                        data: this.values,
                        borderWidth: 4,
                        backgroundColor: this.colors
                    }
                ]
            }} />)
        }
    }

    render() {
        return (
            <>
                <Header {...props} />
                <div className='chart'>
                    <div className='type'>
                        <select name="tipo" id="type"
                            onChange={e => this.type = (e.target.value)}>
                            <option selected value='bar'>Barra</option>
                            <option value="pie">Pizza</option>
                        </select>
                    </div>
                    <div className="Fluxo">

                        <div className="data">

                            <input className='input-group' type='date' value={this.dateStart}
                                onChange={e => this.dateStart = (e.target.value)} />
                        </div>
                        <div className="data">
                            <input className='input-group' type='date' value={this.dateEnd}
                                onChange={e => this.dateEnd = (e.target.value)} />
                        </div>
                        <div className="button">

                            <button className='btn' onClick={e => this.getDatas()}>Filtrar</button>
                        </div>

                    </div>
                    <hr />
                   {this.chart()}
                </div>
            </>
        )
    }
}