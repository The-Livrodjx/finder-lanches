import React, { useState, useRef, useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/userContext'
import { Link } from 'react-router-dom'
import { FaAlignJustify, FaArrowRight, FaTrash, FaShoppingCart } from 'react-icons/fa'
import xCloseIcon from '../../assets/images/x-close-icon.png'
import LoginForm from '../partials/Login/LoginForm'
import RegisterForm from '../partials/Register/RegisterForm'
import './styles.css'

export default function Header() {

    const { userName, authenticated, handleLogOut } = useContext(UserContext)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showRegisterForm, setShowRegister] = useState(false)

    const topRef = useRef()

    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (authenticated) {
            setShowLoginForm(false)
            setShowRegister(false)
        }
    }, [authenticated, showLoginForm])

    if (localStorage.getItem('cart') == null) localStorage.setItem('cart', "[]");

    function getCart() {
        setCart(JSON.parse(localStorage.getItem('cart')));
    }

    function listCart() {
        if (cart != null && cart.length !== 0) {
            return cart.map(product => (
                <li key={product.id} id={product.id}>
                    <img width="20" height="20" src={product.url} alt="" />
                    <h4 className="title">{product.name}</h4>

                    <p className="value">{product.price}</p>

                    <FaTrash size={14} onClick={e => { e.preventDefault(); removeProduct(product.id); }} />
                </li>
            ))
        } else {
            return (
                <li id="emptyCart">
                    <h4>Seu Carrinho Está Vazio</h4>
                </li>
            )
        };
    };

    function removeProduct(id) {
        const item = document.getElementById(id);
        item.classList.add("fade-out");

        setTimeout(function () {
            const newCart = cart.filter(product => product.id !== id);

            localStorage.setItem('cart', JSON.stringify(newCart));
            setCart(newCart);
        }, 200);
    };

    document.addEventListener("DOMContentLoaded", function (event) {
        const navbar = document.querySelector('nav.header');

        window.onscroll = () => {
            window.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
        }

    })

    function logOut(e) {

        e.preventDefault()

        // eslint-disable-next-line no-restricted-globals
        let confirmation = confirm("Tem certeza que deseja sair ?")

        if (confirmation) {
            handleLogOut()
            window.location.reload()
        }
    }

    function handleShowLoginForm(e) {

        e.preventDefault()
        topRef.current.scrollIntoView({ behavior: "smooth" })
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
            <div className="awaysTopPage" ref={topRef} />

            <nav className="header">

                <div className="logo">
                    <img src="https://img.icons8.com/plasticine/2x/hamburger.png" alt="Finder-lanches" />
                    <p>Finder Lanches</p>
                </div>

                <ul className="nav">

                    <img className="icon cancel-btn" src={xCloseIcon} style={{ width: 25, height: 25 }} alt="" />


                    <li>
                        <a href="/" className="navLink"><img src="https://img.icons8.com/ios/452/search--v3.png" alt="Procurar" /></a>
                    </li>
                    <li>
                        <div id="cart" className="header-list" onMouseOver={getCart}>
                            <Link to="/cart" className="header-list-title">
                                <FaShoppingCart size={14} />
                            </Link>

                            <ul className="fade">
                                {listCart()}
                            </ul>
                        </div>
                    </li>
                    <li>
                        {userName !== undefined ? (
                            <>
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    <img style={{ width: 35, height: 35, marginRight: 10 }}
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png"
                                        alt="Usuário" />

                                    <h4>{userName}</h4>
                                </div>

                            </>

                        ) : (
                            <a href="/" className="navLink" onClick={(event) => handleShowLoginForm(event)}><img src="https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png" alt="Usuário" /></a>
                        )}


                    </li>


                    {userName !== undefined && (
                        <li>
                            <a href="/" className="navLink"><FaArrowRight onClick={e => logOut(e)} style={{ width: '1.6rem', height: '1.6rem' }} alt="Sair" /></a>
                        </li>
                    )}

                    <FaAlignJustify className="icon menu-btn" />

                </ul>
            </nav>

            {showLoginForm ? (
                <LoginForm
                    forShowLoginForm={handleShowLoginForm}
                    forShowRegisterForm={handleShowRegisterForm}
                />
            ) : (<> </>)}

            {showRegisterForm ? (
                <RegisterForm
                    forShowLoginForm={handleShowLoginForm}
                    forShowRegisterForm={handleShowRegisterForm}
                />
            ) : (<></>)}


        </>
    )
}