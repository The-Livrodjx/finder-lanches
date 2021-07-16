import React, {useContext} from 'react'
import InputMask from 'react-input-mask'
import { UserContext } from '../../../contexts/userContext'
import './styles.css'
import closeIcon from '../../../assets/images/x-close-icon.png'

export default function RegisterForm(props) {
    const {handleRegister, errorMessage} = useContext(UserContext)

    return (
        <div className="register-form">

            <div className="register-form-content">
                <a href="/" onClick={event => props.forShowRegisterForm(event)}><img src={closeIcon} alt="" /></a>
                <h1>Cadastrar uma conta</h1>

                {errorMessage !== undefined && (
                    <p style={{color: "red"}}>{errorMessage}</p>
                )}
                
                <form action="" onSubmit={e => handleRegister(e)}>

                    <input type="text" name="name" placeholder="Nome" /><br />
                    <input type="text" name="email" placeholder="E-mail" /><br />
                    <input type="password" placeholder="Senha" name="password" /><br />
                    <InputMask type="tel" name="telefone" mask="(99) 99999-9999" placeholder="Tel: (dd) 90000-1820"/><br />
                    <InputMask type="tel" name="endereco" mask="99999-999" placeholder="CEP"/><br />
                

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