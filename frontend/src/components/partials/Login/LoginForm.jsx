import React from 'react'
import './styles.css'
import closeIcon from '../../../assets/images/x-close-icon.png'

export default function LoginForm(props) {

    return (
        <div className="login-form">

            <div className="login-form-content">
                <a href="/" onClick={event => props.forShowLoginForm(event)}><img src={closeIcon} alt="" /></a>
                <h1>Entre com sua conta</h1>

                <form action="">

                    <input type="text" placeholder="E-mail" /><br />
                    <input type="password" placeholder="Senha" name="" id="" /><br />

                    <button type="submit">Continuar</button>
                </form>

                <div className="create-account">
                    <p>Ainda não tem conta ?</p>
                    <button onClick={e => props.forShowRegisterForm(e)}>Cadastrar</button>
                </div>
            </div>
        </div>
    )
}