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

    state = {

        dateStart: undefined,
        dateEnd: undefined,
        categories: [],
        values: [],
        colors: [],
        type: '',
        chart:  () => {
            return (
                <Bar data={{
                    labels: this.state.categories,
                    datasets: [
                        {
                            label: 'Categorias',
                            data: this.state.values,
                            borderWidth: 4,
                            backgroundColor: this.state.colors
                        }
                    ]
                }} />
            )
        }
    }

    setType(e) {
        this.setState({ type: e.target.value })
        console.log("state type: ", this.state.type)

        if (this.state.type == 'bar') {
            this.setState({
                chart: () => {
                    return (
                        <Bar data={{
                            labels: this.state.categories,
                            datasets: [
                                {
                                    label: 'Categorias',
                                    data: this.state.values,
                                    borderWidth: 4,
                                    backgroundColor: this.state.colors
                                }
                            ]
                        }} />
                    )
                }
            })
        }
        else if(this.state.type == 'pie') {
            this.setState({
                chart: () => {
                    return (
                        <Pie data={{
                            labels: this.state.categories,
                            datasets: [
                                {
                                    label: 'Categorias',
                                    data: this.state.values,
                                    borderWidth: 4,
                                    backgroundColor: this.state.colors
                                }
                            ]
                        }} />
                    )
                }
            })
        }
    }
    async UNSAFE_componentWillMount() {
        this.setState({ values: [], categories: [], colors: [] })
        if (window.localStorage.getItem('id') == 0) {
            this.props.history.push('/login')
            alert('Necessário fazer login')
        }

        await axios.get(baseUrl + '/chart', {
            headers:
            {
                token: 'bearer ' + window.localStorage.getItem('token'),
                authorization: window.localStorage.getItem('id'),
                dateStart: this.state.dateStart,
                dateEnd: this.state.dateEnd,
            }
        })
            .then(resp => {
                this.setState(
                    {
                        categories: resp.data.categories,
                        colors: resp.data.colors,
                        values: resp.data.frequency
                    })
            })
    }
    getDatas() {
        this.UNSAFE_componentWillMount()
    }

    render() {
        return (
            <>
                <Header {...props} />
                <div className='chart'>
                    <div className='type'>
                        <select name="tipo" id="type"
                            onChange={e => this.setType(e)}>
                            <option selected value='bar'>Barra</option>
                            <option value="pie">Pizza</option>
                        </select>
                    </div>
                    <div className="Fluxo">

                        <div className="data">

                            <input className='input-group' type='date' value={this.dateStart}
                                onChange={e => this.setState({ dateStart: e.target.value })} />
                        </div>
                        <div className="data">
                            <input className='input-group' type='date' value={this.dateEnd}
                                onChange={e => this.setState({ dateEnd: e.target.value })} />
                        </div>
                        <div className="button">

                            <button className='btn' onClick={e => this.getDatas()}>Filtrar</button>
                        </div>

                    </div>
                    <hr />
                    {this.state.chart()}
                   </div>
            </>
        )
    }
}