import React from 'react'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'


export default function Routes() {

    return (

        <Router>
            <Header/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" exact component={About}/>
            </Switch>
        </Router>
    )
}