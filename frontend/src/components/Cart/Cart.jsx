import React, {useState} from 'react'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
// FaCreditCard, FaBarcode
import {FaShoppingCart, FaTrash, FaMinus, FaPlus} from 'react-icons/fa';
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
                let subtotal = 0

                cart.forEach(product => {

                    subtotal += product.value
                })

                let total = subtotal
                

                setCartTotal(total)
            }
        }
    }

    function incrementAmount(e, productId, productPrice) {

        e.preventDefault()

        const item = document.getElementById(`amountToSell${productId}`)
        const value = document.getElementById(`value${productId}`)

        let oldCart = cart.find(product => product.id === productId)
        

        let currentAmount = Number(oldCart.amountToSell) + 1
        let currentValue = Number(oldCart.value) + productPrice

        
        
        oldCart.value = currentValue
        oldCart.amountToSell = currentAmount

        const newCart = cart.filter(product => product.id !== productId)

        newCart.push(oldCart)

        

        item.innerHTML = currentAmount
        value.innerHTML = 'R$'+currentValue

        setCartTotal(cartTotal + productPrice)

        localStorage.setItem('cart', JSON.stringify(newCart))
    }

    function decrementAmount(e, productId, productPrice) {
        e.preventDefault()

        const item = document.getElementById(`amountToSell${productId}`)
        const value = document.getElementById(`value${productId}`)

        
        let currentAmount = Number(item.innerHTML) - 1
        let currentValue = Number(value.innerHTML.split('$')[1]) - productPrice
        let oldCart = cart.find(product => product.id === productId)
        
        
        
        oldCart.value = currentValue
        oldCart.amountToSell = currentAmount

        const newCart = cart.filter(product => product.id !== productId)

        newCart.push(oldCart)

        if(currentAmount >= 1) {

            item.innerHTML = currentAmount
            value.innerHTML = 'R$'+currentValue

            setCartTotal(cartTotal - productPrice)
            localStorage.setItem('cart', JSON.stringify(newCart))
        }
    }

    function removeProduct(e, productId, productPrice) {

        e.preventDefault()

        const item = document.getElementById(productId)
        item.classList.add("fadeout")

        setTimeout(() => {

            const newCart = cart.filter(product => product.id !== productId)

            localStorage.setItem('cart', JSON.stringify(newCart))
            setCart(newCart)
            setCartTotal(cartTotal - productPrice)

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
        
                                <p className="value" id={`value${product.id}`}>R${
                                    product.value
                                }</p>

                                <div className="quantity">
                                    <FaMinus onClick={e => decrementAmount(e, product.id, product.initialValue)}/>
                                    <p id={`amountToSell${product.id}`}>{product.amountToSell}</p>
                                    <FaPlus onClick={e => incrementAmount(e, product.id, product.initialValue)}/>
                                </div>
                            
                                <FaTrash size={14} className="trashIcon" onClick={e => removeProduct(e, product.id, product.initialValue)}/>
                            </li>
                        ))}
                    </ul>

                    <ul className="price-table">
                       

                        <li>
                            <h4>Total</h4>
                            <p className="price">{
                                cartTotal
                            }</p>
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