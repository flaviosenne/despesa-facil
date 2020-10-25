import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './views/App'
import Home from './views/Home'
import Login from './views/Login'
import Recovery from './views/RecoveryPassword'
import Email from './views/Email'
import About from './views/About'
import CreateUser from './views/CreateUser'
import CreateFlow from './views/CreateFlow'
import UpdateFlow from './views/UpdateFlow'
import UserUpdate from './views/UpdateUser'
import Report from './components/Report'
import Cash from './views/Cash'
import NotFound from './components/NotFound'

export default Views => {
    return (
        <>
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component ={App}/>
                <Route path = "/home" exact component =
                {window.localStorage.getItem('user') != 0? Home: App}/>
                <Route path = "/login" exact component ={Login}/>
                <Route path = "/senha" exact component ={Recovery}/>
                <Route path = "/email" exact component ={Email}/>
                <Route path = "/sobre" exact component ={About}/>
                <Route path = "/usuario" exact component ={CreateUser}/>
                <Route path = "/usuario/:id" exact component ={UserUpdate}/>
                <Route path = "/despesa" exact component ={CreateFlow}/>
                <Route path = "/despesa-update/:id" exact component ={UpdateFlow}/>
                <Route path = "/fluxo-caixa" exact component ={Cash}/>
                <Route path = "/relatorio" exact component ={Report}/>
                <Route component ={NotFound}/>
            </Switch>
        </BrowserRouter>
        </>
    )
}