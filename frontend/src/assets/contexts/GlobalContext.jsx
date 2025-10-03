import { createContext, useContext, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        const savedToken = localStorage.getItem("gym_token")
        const savedUser = localStorage.getItem("gym_user")

        if (savedToken) {
            setIsAuthenticated(true)
            setToken(savedToken)
            setUser(savedUser)
        }

        setLoading(false)
    }, [])

    async function login(email, password) {
        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: POST,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Errore Login")

            setIsAuthenticated(true)
            setToken(data.token)
            setUser(data.user)

            localStorage.setItem("gym_token", data.token)
            localStorage.setItem("gym_user", JSON.stringify(data.user))
        } catch (error) {
            console.error("Errore login:", error.message);
            return false;
        }
    }

    async function logout() {
        setIsAuthenticated(false)
        setToken(null)
        setUser(null)

        localStorage.removeItem("gym_token")
        localStorage.removeItem("gym_user")
        navigate('/login')
       
    }
    //funzione che aggiunge il token ad ogni chiamata fetch per verificare l'identità dell'utente.
    async function fetchWithAuth (url, options = {}){
        const headers = {
            ...(options.headers || {}),
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }

        return fetch(url, {...options, headers})
    }



    return (
        <GlobalContext.Provider
            value={{
                token,
                setToken,
                user,
                setUser,
                isAuthenticated,
                setIsAuthenticated,
                loading,
                setLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalContext = () => useContext(GlobalContext);
