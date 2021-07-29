import React, {useContext} from 'react'

import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import { AuthProvider } from './contexts/userContext.js'
import { UserContext } from './contexts/userContext.js'
import Cart from './components/Cart/Cart'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Profile from './pages/Profile/Profile'
import Admin from './pages/admin/Admin'


function CustomRoute({isPrivate, ...rest}) {

    const { authenticated } = useContext(UserContext)

    if(isPrivate && !authenticated) {
        return <Redirect to="/login" />
    }

    return <Route {...rest} />
}

function AdminRoute({isPrivate, ...rest}) {

    const {authenticated, isUserAdmin} = useContext(UserContext)
    console.log(isUserAdmin)
    if(isPrivate && !authenticated && !isUserAdmin) {

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
                    <CustomRoute path="/login" component={Login}/>
                    <CustomRoute path="/register" component={Register}/>
                    <CustomRoute isPrivate path="/profile" component={Profile}/>
                    <AdminRoute isPrivate path="/admin" component={Admin}/>
                </Switch>
                <Footer />
            </AuthProvider>
        </Router>
    )
}