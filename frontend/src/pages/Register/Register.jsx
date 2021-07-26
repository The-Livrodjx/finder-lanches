import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/userContext'
import './styles.css'
import InputMask from 'react-input-mask'

export default function Register() {

    const {errorMessage, handleRegister} = useContext(UserContext)

    return (

        <>
            <div className="register-page">

                <div className="register-page-content">

                    <h1>Cadastrar uma conta</h1>

                    {errorMessage !== undefined && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    )}

                    <form action="" onSubmit={e => handleRegister(e, true)}>

                        <input type="text" name="name" placeholder="Nome" /><br />
                        <input type="text" name="email" placeholder="E-mail" /><br />
                        <input type="password" placeholder="Senha" name="password" /><br />
                        <InputMask type="tel" name="telefone" mask="(99) 99999-9999" placeholder="Tel: (dd) 90000-1820" /><br />
                        <InputMask type="tel" name="endereco" mask="99999-999" placeholder="CEP" /><br />


                        <button type="submit">Continuar</button>
                    </form>

                    <div className="create-account">
                        <p>Já tem conta ?</p>
                        <Link to="/login">Fazer Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}