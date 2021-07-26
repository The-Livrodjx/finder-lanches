import React from 'react'
import './styles.css'
import { CardElement } from '@stripe/react-stripe-js'

const PaymentForm = () => {

    return (

        <>
            <div className="checkout-page">
                <div className="checkout-content">
                    <form action="" id="payment-form">

                        <CardElement />

                        <button>Pay</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaymentForm