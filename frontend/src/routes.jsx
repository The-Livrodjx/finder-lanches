import React, {useContext} from 'react'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { AuthProvider } from './contexts/userContext.js'
import { UserContext } from './contexts/userContext.js'
import Cart from './components/Cart/Cart'

function CustomRoute({isPrivate, ...rest}) {

    const { authenticated } = useContext(UserContext)

    if(isPrivate && !authenticated) {
        return <Redirect to="/" />
    }

    return <Route {...rest} />
}
export default function Routes() {

    return (

        <Router>
            <AuthProvider>
                <Header/>
                <Switch>
                    <CustomRoute path="/" exact component={Home}/>
                    <CustomRoute path="/cart" component={Cart}/>
                    <CustomRoute isPrivate path="/about" component={About}/>
                </Switch>
                <Footer />
            </AuthProvider>
        </Router>
    )
}