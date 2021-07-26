import React, { useContext } from 'react'
import { Redirect } from 'react-router'
import {Link} from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import './styles.css'

export default function Login() {
    const
        { authenticated,
            handleLogin,
            errorMessage
        } = useContext(UserContext)

    if(authenticated) {
        return <Redirect to="/" />
    }
    return (
        
        <>
            {!authenticated && (

                <div className="login-page">

                    <div className="login-page-content">
                        
                        <h1>Entre com sua conta</h1>

                        {errorMessage !== undefined ?
                            (
                                <p style={{ color: "red" }}>{errorMessage}</p>
                            ) :
                            (<></>)
                        }
                        <form action="" onSubmit={e => handleLogin(e, true)}>

                            <input type="email" placeholder="E-mail" name="email" /><br />
                            <input type="password" placeholder="Senha" name="password" id="" /><br />

                            <button type="submit" >Continuar</button>
                        </form>

                        <div className="create-account">
                            <p>Ainda não tem conta ?</p>
                            <Link to="/register">Cadastrar</Link>
                        </div>
                    </div>
                </div>
            )}
        </>

    )

}