import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import App from './views/App'
import Home from './views/Home'
import Login from './views/Login'
import About from './views/About'
import CreateUser from './views/CreateUser'
import CashFlow from './views/CashFlow'

export default Views => {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component ={App}/>
                <Route path = "/home" exact component ={Home}/>
                <Route path = "/login" exact component ={Login}/>
                <Route path = "/sobre" exact component ={About}/>
                <Route path = "/usuario" exact component ={CreateUser}/>
                <Route path = "/fluxo-caixa" exact component ={CashFlow}/>
            </Switch>
        </BrowserRouter>
        </>
    )
}