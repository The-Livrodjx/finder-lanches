import React, {useState} from 'react'
import './styles.css'

export default function Header() {

    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegister] = useState(false)

    function handleShowLoginForm(e) {

        e.preventDefault()
        setShowRegister(false)
        setShowLoginForm(!showLoginForm)
        
        console.log("Estado mudado para: " + showLoginForm)
    }

    function handleShowRegisterForm(e) {

        e.preventDefault()

        setShowLoginForm(false)
        setShowRegister(!showRegisterForm)
    }

    return (

        <>

            <nav className="header">
                <div className="logo">
                    <img src="https://img.icons8.com/plasticine/2x/hamburger.png" alt="Finder-lanches" />
                    <p>Finder Lanches</p>
                </div>
                <ul className="nav">
                    <li>
                        <a href="/"><img src="https://img.icons8.com/ios/452/search--v3.png" alt="Procurar"/></a>
                    </li>
                    <li>
                        <a href="/" onClick={(event) => handleShowLoginForm(event)}><img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" alt="Usuário"/></a>
                    </li>
                    <li>
                        <a href="/"><img src="https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png" alt="Carrinho de compras"/></a>
                    </li>
                </ul>
            </nav>

            {showLoginForm ? (
                <div className="login-form">
                    
                    <div className="login-form-content">
                        <a href="/" onClick={event => handleShowLoginForm(event)}><img src="https://icon-library.com/images/x-close-icon/x-close-icon-27.jpg" alt="" /></a>
                        <h1>Entre com sua conta</h1>

                        <form action="">

                            <input type="text" placeholder="E-mail"/><br/>
                            <input type="password" placeholder="Senha" name="" id="" /><br />

                            <button type="submit">Continuar</button>
                        </form>

                        <div className="create-account">
                            <p>Ainda não tem conta ?</p>
                            <button onClick={e => handleShowRegisterForm(e)}>Cadastrar</button>
                        </div>
                    </div>
                </div>
            ) : ( <> </>)}
            
            {showRegisterForm ? (
                <div className="register-form">
                    
                    <div className="register-form-content">
                        <a href="/" onClick={event => handleShowRegisterForm(event)}><img src="https://icon-library.com/images/x-close-icon/x-close-icon-27.jpg" alt="" /></a>
                        <h1>Cadastrar uma conta</h1>

                        <form action="">

                            <input type="text" placeholder="Nome"/><br/>
                            <input type="text" placeholder="E-mail"/><br/>
                            <input type="password" placeholder="Senha" name="" id="" /><br />
                            <input type="text" placeholder="Tel: (dd) 90000-1820" name="" id="" /><br />
                            <input type="text" placeholder="Endereço" name="" id="" /><br />

                            <button type="submit">Continuar</button>
                        </form>

                        <div className="create-account">
                            <p>Já tem conta ?</p>
                            <button onClick={e => handleShowLoginForm(e)}>Fazer Login</button>
                        </div>
                    </div>
                </div>
            ) : (<></>)}

        </>
    )
}