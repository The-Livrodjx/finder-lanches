import React, { useEffect, useState } from 'react'
import {format, parseISO} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import './styles.css'
import api from '../../services/api'


export default function Admin() {

    const [allRequests, setAllRequests] = useState([])

    useEffect(() => {

        api.get('/getAllRequests').then(response => {

            console.log(response.data)
            setAllRequests(response.data)
        })
    }, [])

    return (

        <div className="admin-page">
            <div className="admin-content">
                <h1>Painel Administrador</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pagador</th>
                            <th>Data</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allRequests.length > 0 ? (
                            <>
                                {allRequests.map(request => (
                                    <tr key={request.id}>

                                        <td >{request.id}</td>
                                        <td>{request.payer}</td>
                                        <td>{format(parseISO(request.createdAt.split('T')[0]),
                                            "EEEE, d MMMM 'de' Y", { locale: ptBR })}</td>

                                        <td>{request.status === 1 ? (
                                            <>
                                                Pagamento ainda não realizado
                                            </>
                                        ) : (
                                            <>
                                                Pagamento realizado
                                            </>
                                        )}</td>
                                    </tr>

                                ))}


                            </>
                        ) : (

                            <td>Nada pra mostrar aqui</td>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}