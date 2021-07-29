/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useState } from 'react'
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';
import { ptBR } from 'date-fns/locale';
import { UserContext } from '../../contexts/userContext'
import api from '../../services/api'
import './styles.css'
import { convertHour } from '../../utils/convertHour';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Profile() {

    const [requests, setRequests] = useState([])
    const { userEmail } = useContext(UserContext)

    useEffect(() => {

        let email = userEmail

        api.post('/getRequests', { email }).then(response => {

            setRequests(response.data)
        })

    }, [userEmail, requests])

    function handleCancelRequest(e, requestId) {

        e.preventDefault()

        let confirmation = confirm("Tem certeza que deseja cancelar o seu pedido ?")

        if (confirmation) {
            api.delete(`deleteRequest/${requestId}`).then(() => {
            })
        }
    }

    return (
        <>
            <div className="profile-page">
                <h1>Perfil</h1>

                <div className="profile-content">


                    <h2>Seus pedidos: </h2>

                    <ul className="request-list">

                        {requests.length > 0 ? (
                            <>
                                {requests.map(request => (
                                    <li key={request.id}>

                                        <h4 >{request.description}</h4>

                                        <p>{format(parseISO(request.createdAt.split('T')[0]),
                                            "EEEE, d MMMM 'de' Y", { locale: ptBR })}</p>
                                        {<p>{convertHour(request.createdAt.split('T')[1].split('.0')[0])}</p>}
                                        {request.status === 0 ?
                                            <button className="cancelRequest" onClick={e => handleCancelRequest(e, request.id)}>Cancelar Pedido</button>
                                            :
                                            <button className="finishedRequest">Compra finalizada</button>
                                        }
                                    </li>

                                ))}


                            </>
                        ) : (

                            <li>Você ainda não comprou nada</li>
                        )}
                    </ul>
                    <Link to="/" className="backButton">
                        <span>
                            <FiArrowLeft />
                        </span>
                        <strong style={{ paddingRight: 1 }}>Voltar a comprar</strong>
                    </Link>
                </div>
            </div>
        </>


    )
}