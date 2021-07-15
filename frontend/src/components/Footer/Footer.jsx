import React from 'react'
import './styles.css'
import {FaMobile, FaHeart, FaFacebook, FaInstagram} from 'react-icons/fa'

export default function Footer() {


    return (

        <>
            <footer>
                <h1 className="madeBy">Made with <FaHeart/> by 
                    <a href="https://github.com/The-Livrodjx" target="_blank" rel="noreferrer" 
                    className="me">Livrodjx</a>
                </h1>
                <div className="footer-contact">
                    <FaMobile />
                    <h1>Telefone para contato: </h1>
                    <p>(11) 97841-1017</p>

                    <div className="social-medias">
                        <FaFacebook />
                        <FaInstagram />
                    </div>
                </div>
            </footer>
        </>
    )
}