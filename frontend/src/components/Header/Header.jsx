import React, {useState, useRef, useContext, useEffect} from 'react'
import { UserContext } from '../../contexts/userContext'
import {FaAlignJustify, FaArrowRight} from 'react-icons/fa'
import xCloseIcon from '../../assets/images/x-close-icon.png'
import LoginForm from '../partials/Login/LoginForm'
import RegisterForm from '../partials/Register/RegisterForm'
import './styles.css'

export default function Header() {

    const {userName, authenticated, handleLogOut} = useContext(UserContext)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegister] = useState(false)

    const topRef = useRef()

    document.addEventListener("DOMContentLoaded", function(event) { 
        const navbar = document.querySelector('nav.header');

        window.onscroll = () => {
            window.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
        }
        
    })

    useEffect(() => {
        if(authenticated) {
            setShowLoginForm(false)
        }
    }, [authenticated, showLoginForm])

    function logOut(e) {

        e.preventDefault()
        
        // eslint-disable-next-line no-restricted-globals
        let confirmation = confirm("Tem certeza que deseja sair ?")

        if(confirmation) {
            handleLogOut()
            window.location.reload()
        }
    }

    function handleShowLoginForm(e) {

        e.preventDefault()
        topRef.current.scrollIntoView({behavior: "smooth"})
        setShowRegister(false)
        setShowLoginForm(!showLoginForm)
    }

    function handleShowRegisterForm(e) {

        e.preventDefault()

        setShowLoginForm(false)
        setShowRegister(!showRegisterForm)
    }

    return (

        <>
            <div className="awaysTopPage" ref={topRef}/>

            <nav className="header">
        
                <div className="logo">
                    <img src="https://img.icons8.com/plasticine/2x/hamburger.png" alt="Finder-lanches" />
                    <p>Finder Lanches</p>
                </div>

                <ul className="nav">
                    
                    <img className="icon cancel-btn" src={xCloseIcon} style={{width: 25, height: 25}}alt=""/>
                   

                    <li>
                        <a href="/" className="navLink"><img src="https://img.icons8.com/ios/452/search--v3.png" alt="Procurar"/></a>
                    </li>
                    <li>
                        {userName !== undefined ? (
                            <>  
                                <div style={{display: 'inline-flex', alignItems: 'center'}}>
                                    <img style={{width: 35, height: 35, marginRight: 10}} 
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" 
                                    alt="Usuário"/>

                                    <h4>{userName}</h4>
                                </div>
                                
                            </>
                            
                        ) : (
                            <a href="/" className="navLink" onClick={(event) => handleShowLoginForm(event)}><img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" alt="Usuário"/></a>
                        )}
                        
                        
                    </li>
                    <li>
                        <a href="/" className="navLink"><img src="https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png" alt="Carrinho de compras"/></a>
                    </li>
                    
                    {userName !== undefined && (
                        <li>
                            <a href="/" className="navLink"><FaArrowRight onClick={e => logOut(e)} style={{width: '1.6rem', height: '1.6rem'}} alt="Sair"/></a>
                        </li>
                    ) }
                  
                    <FaAlignJustify className="icon menu-btn" />
                    
                </ul>
            </nav>

            {showLoginForm ? (
                <LoginForm 
                    forShowLoginForm={handleShowLoginForm} 
                    forShowRegisterForm={handleShowRegisterForm}
                />
            ) : ( <> </>)}
            
            {showRegisterForm ? (
                <RegisterForm 
                    forShowLoginForm={handleShowLoginForm}
                    forShowRegisterForm={handleShowRegisterForm}
                />
            ) : (<></>)}

        </>
    )
}