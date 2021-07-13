import React from 'react'
import './styles.css'
import closeIcon from '../../../assets/images/x-close-icon.png'

export default function RegisterForm(props) {

    return (
        <div className="register-form">

            <div className="register-form-content">
                <a href="/" onClick={event => props.forShowRegisterForm(event)}><img src={closeIcon} alt="" /></a>
                <h1>Cadastrar uma conta</h1>

                <form action="">

                    <input type="text" placeholder="Nome" /><br />
                    <input type="text" placeholder="E-mail" /><br />
                    <input type="password" placeholder="Senha" name="" id="" /><br />
                    <input type="text" placeholder="Tel: (dd) 90000-1820" name="" id="" /><br />
                    <input type="text" placeholder="Endereço" name="" id="" /><br />

                    <button type="submit">Continuar</button>
                </form>

                <div className="create-account">
                    <p>Já tem conta ?</p>
                    <button onClick={e => props.forShowLoginForm(e)}>Fazer Login</button>
                </div>
            </div>
        </div>
    )
}