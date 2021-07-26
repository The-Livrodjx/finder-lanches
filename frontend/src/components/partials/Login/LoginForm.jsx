import React, {useContext} from 'react'
import { UserContext } from '../../../contexts/userContext'
import './styles.css'
import closeIcon from '../../../assets/images/x-close-icon.png'

export default function LoginForm(props) {

    const { handleLogin, errorMessage } = useContext(UserContext)
    
    return (
        <div className="login-form">

            <div className="login-form-content">
                <a href="/" onClick={event => props.forShowLoginForm(event)}><img src={closeIcon} alt="" /></a>
                <h1>Entre com sua conta</h1>

                {errorMessage !== undefined ? 
                    (
                        <p style={{color: "red"}}>{errorMessage}</p>
                    ) : 
                    (<></>)
                }
                <form action="" onSubmit={e => handleLogin(e, false)}>

                    <input type="email" placeholder="E-mail" name="email"/><br />
                    <input type="password" placeholder="Senha" name="password" id="" /><br />

                    <button type="submit" >Continuar</button>
                </form>

                <div className="create-account">
                    <p>Ainda não tem conta ?</p>
                    <button onClick={e => props.forShowRegisterForm(e)}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}