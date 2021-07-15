import React, {createContext, useEffect, useState} from 'react'

import api from '../services/api'

const UserContext = createContext()

function AuthProvider({children}) {

    const [authenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState(undefined)
    const [errorMessage, setErrorMessage] = useState(undefined)

    useEffect(() => {

        const token = localStorage.getItem('token')
        const userName = localStorage.getItem('userName')

        if(token) {
            var req = {

                headers: {
                    Authorization: "Bearer " + token
                }
            }

            api.get('/', req).then(response => {

                if(response.status === 200) {
                    api.defaults.headers.Authorization = `Bearer ${token}`

                    setIsAuthenticated(true)
                    setUserName(`${userName}`)
                }
            }).catch(err => {
                alert("Seu token é inválido, por favor faça login novamente")
            })
        }
    }, [])

    function handleLogin(e) {
        e.preventDefault()
        
        let email = e.target.email.value
        let password = e.target.password.value
        
        api.post('/authenticate', {email, password}).then(response => {

            api.defaults.headers.Authorization = 'Bearer ' + response.data.token

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userName', response.data.userName)
            setUserName(`${response.data.userName}`)
            setIsAuthenticated(true)

            return true

        }).catch(err => {
            console.log(err)
            if(err) {
                setErrorMessage(err.response.data.errMsg)
            }

            return false
        })
        
    }

    function handleLogOut() {

        setIsAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        api.defaults.headers.Authorization = undefined
    }

    return (
        <UserContext.Provider 
            value={{
                userName, 
                authenticated, 
                handleLogin,
                handleLogOut, 
                errorMessage
            }}>
            {children}
        </UserContext.Provider>
    )
}


export {UserContext, AuthProvider}