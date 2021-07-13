import React, {useState, useRef} from 'react'
import {FaAlignJustify} from 'react-icons/fa'
import xCloseIcon from '../../assets/images/x-close-icon.png'
import LoginForm from '../partials/Login/LoginForm'
import RegisterForm from '../partials/Register/RegisterForm'
import './styles.css'

export default function Header() {

    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegister] = useState(false)

    const topRef = useRef()

    document.addEventListener("DOMContentLoaded", function(event) { 
        const navbar = document.querySelector('nav.header');

        window.onscroll = () => {
            window.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
        }
        const body = document.querySelector("body");
        const menuBtn = document.querySelector(".menu-btn");
        const cancelBtn = document.querySelector(".cancel-btn");
        const navLink = document.querySelectorAll('.navLink')

        menuBtn.onclick = ()=>{
            navbar.classList.add("show");
            menuBtn.classList.add("hide");
            body.classList.add("disabled");

            navLink.forEach(link => {

                link.onclick = () => {
                    body.classList.remove("disabled");
                    navbar.classList.remove("show");
                    menuBtn.classList.remove("hide");
                }
            })
        }

        cancelBtn.onclick = ()=>{
            body.classList.remove("disabled");
            navbar.classList.remove("show");
            menuBtn.classList.remove("hide");
        }
    })


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
                        <a href="/" className="navLink" onClick={(event) => handleShowLoginForm(event)}><img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" alt="Usuário"/></a>
                    </li>
                    <li>
                        <a href="/" className="navLink"><img src="https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png" alt="Carrinho de compras"/></a>
                    </li>

                  
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