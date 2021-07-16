import React, {useState} from 'react'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {FaShoppingCart, FaTrash, FaMinus, FaPlus, FaCreditCard, FaBarcode} from 'react-icons/fa';
import {Link} from 'react-router-dom'

export default function Cart() {

    const [cart, setCart] = useState('')
    const [cartTotal, setCartTotal] = useState('')

    if(cart === '') {

        if(localStorage.getItem('cart') == null) {
            
            localStorage.setItem("cart", "[]")
        }
        else {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }

    function getCartTotal() {

        if(cart.length !== 0 || cart !== '') {

            if(cartTotal === '' || cartTotal.total === 0) {
                let [subtotal, subtotalParceled, total, totalParceled] = [0, 0, 0, 0]

                cart.forEach(product => {

                    subtotal += product.price
                    subtotalParceled += product.parceled

                })

                total = subtotal
                totalParceled = subtotalParceled

                setCartTotal({subtotal, subtotalParceled, total, totalParceled})
            }
        }
    }

    function removeProduct(e, productId) {

        e.preventDefault()

        const item = document.getElementById(productId)
        item.classList.add("fadeout")

        setTimeout(() => {

            const newCart = cart.filter(product => product.id !== productId)

            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(newCart)

        }, 200)
    }

    function renderCart() {

        if(cart.length === 0) {

            return (

                <div className="cartEmpty">
                <p>Desculpa, não encontramos nenhum item em seu carrinho {":("} </p>

                    <Link to="/" className="backButton">
                        <span>
                            <FiArrowLeft/>
                        </span>
                        <strong>Voltar ao inicio</strong>
                    </Link>
                </div>
            )
        }
        else {
            getCartTotal()

            return (
                <div className="shop-info">
                    <ul className="shop-table">
                        {cart.map( product => (
                            <li key={product.id} id={product.id}>
                                <img src={product.url} alt="Produto"/>
        
                                <h4 className="title">{product.name}</h4>
        
                                <p className="value">{
                                    product.price
                                }</p>

                                <div className="quantity">
                                    <FaMinus />
                                    <p>1</p>
                                    <FaPlus />
                                </div>
                            
                                <FaTrash size={14} className="trashIcon" onClick={e => removeProduct(e, product.id)}/>
                            </li>
                        ))}
                    </ul>

                    <ul className="price-table">
                        <li>
                            <h4>Subtotal</h4>
                            <p className="price">{
                                Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(cartTotal.subtotalParceled)
                            }</p>
                        </li>

                

                        <li>
                            <h4>Total</h4>
                            <p className="price">{
                                Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(cartTotal.totalParceled)
                            }</p>
                        </li>

                        <li>
                            <h3>
                                <FaCreditCard />
                                12x de {
                                    cartTotal.totalParceled /12
                                }<br />
                                s/ juros
                            </h3>
                        </li>

                        <li>
                            <h3>
                                <FaBarcode />{
                                    cartTotal.total
                                }<br />
                                com desconto à vista
                            </h3>
                        </li>
                    </ul>

                </div>
            )

        }

        
    }

    return (
        <div className="cart-page">
            <div className="cart-shop">
                <h1><FaShoppingCart /> Carrinho de compras</h1>
            </div>
            {renderCart()}
        </div>
    )
}