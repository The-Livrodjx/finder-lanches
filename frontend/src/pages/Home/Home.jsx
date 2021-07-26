/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {FaShoppingCart} from 'react-icons/fa'

import api from '../../services/api'
import './styles.css'
export default function Home() {

    const [lanches, setLanches] = useState([])

    useEffect(() => {

        if(lanches.length === 0) {

            api.get('/getProducts').then(response => {

                setLanches(response.data)
            })
        }
        
    }, [])

    function addToCart(e, product) {
        e.preventDefault();

        const cart = JSON.parse(localStorage.getItem('cart'));
        const allIds = []

        cart.forEach(elem => {

            return allIds.push(elem.id)
        })
        
        if(allIds.indexOf(product.id) === -1) {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <>
            <div className="home-page">

                <div className="home-content">
                    <div className="apresentation">
                        <h1>Finder Lanches - A melhor opção</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                        
                        <a href="/" className="know-more">Ver cardápio</a>
                    </div>
                </div>  
            </div>

            <section className="lanches">
                <h1>Nossos principais lanches</h1>

                <div className="all-lanches">       

                    {lanches.map(lanche => (
                        <div className="lanche-card" key={lanche.id}>
                            <h1 className="lanche-name">
                                {lanche.name}
                            </h1>
                            <p>{lanche.price}</p>

                            <img src={lanche.url} alt="" />

                            <button className="add-to-cart" onClick={e => addToCart(e, lanche)}><FaShoppingCart />Adicionar ao Carrinho</button>
                        </div>
                    ))}
    
                </div>
            </section>
        </>
    )
}