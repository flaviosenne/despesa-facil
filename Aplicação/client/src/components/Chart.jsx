import React, { Component } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2'
import Header from './Header'
import axios from 'axios'

import baseUrl from '../services/URL'

const props = {
    icon: '', route: '/home',
    user: `/usuario/${window.localStorage.getItem('user')}`,
    icon_user: '',
}
export default class Chart extends Component {
   
    dateStart
    dateEnd
    datas
    chartData = {}
    categories = []
    values = []
    
    async UNSAFE_componentWillMount(){
        await axios.get(baseUrl + '/chart', {
            headers:
            {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                dateStart: !this.dateStart? 
                            new Date().getFullYear()+ '-' 
                            +new Date().getMonth()+ '-'
                            +new Date().getDate() : this.dateStart,
                dateEnd: !this.dateEnd? 
                        new Date().getFullYear()+ '-' 
                        +(new Date().getMonth()+1) +'-'
                        +new Date().getDate() : this.dateEnd,
            }
        })
            .then(resp => {
                this.datas = (resp.data)
                // console.log(resp.data)

            })
        this.filterCategories(this.datas)
        this.filterValues(this.datas)
    }
    getDatas() {
        this.UNSAFE_componentWillMount()
    }

    filterCategories(data) {
        data.forEach(cat => {
            this.categories.push(cat.category)
        })
    }

    filterValues(data) {
        data.forEach(value => {
            this.values.push(value.value)
        })
    }
    getDataToChart(){
        return {
            labels: this.categories,
            datasets: [
        {
            label: 'Categorias',
                    data: this.values,
                    borderWidth: 4
                }
            ]
        }
    }

    render() {
        return (
            <>
                <Header {...props} />
                <div className='chart'>

                    <p>Chart</p>
                    <input type='date' value={this.dateStart}
                        onChange={e => this.dateStart = (e.target.value)} />
                    <input type='date' value={this.dateEnd}
                        onChange={e => this.dateEnd = (e.target.value)} />

                <button onClick={e => this.getDatas()}>Clcik</button>

                <hr />
                <Bar data={this.getDataToChart()}
                options= {{maintainAspectRatio: true}}
                
                />
                </div>
            </>
        )
    }
}