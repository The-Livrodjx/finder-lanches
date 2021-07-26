import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './App';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51JEeaVFKHp4uF6seuM2j0Fxie8eG6Jsp3Up3EDIu2kupTL8y2ihgU2w246ZOu24UmdWaIH7MX9UGDKicE35kvWdA00VqOm5uNm')

ReactDOM.render(
    <Elements stripe={stripePromise}>
        <App />
    </Elements>
    
, 
document.getElementById('root'));
