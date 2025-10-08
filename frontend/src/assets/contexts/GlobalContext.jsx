import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    //funzione che aggiunge il token ad ogni chiamata fetch per verificare l'identità dell'utente.
    async function fetchWithAuth(url, options = {}) {
        const savedToken = token || localStorage.getItem("gym_token");

        if (!savedToken) {
            navigate("/login");
            return;
        }

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const headers = {
            ...(options.headers || {}),
            "Content-Type": "application/json",
            ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
        }
        try {
            const res = await fetch(`${baseUrl}${url}`, { ...options, headers });

            if (!res.ok) {
                console.error("Errore di connessione al server")
            }

            if (res.status === 401) {
                logout()
                navigate('/login')
            }
            return res;

        } catch (error) {
            console.error(error)
        }
    }

    function updateUser(newUserData) {
        setUser(newUserData)
        localStorage.setItem("gym_user", json.stringify(newUserData))
    }




    async function verifyTokenUser() {
        const savedToken = localStorage.getItem("gym_token")
        if (!savedToken) {
            setIsAuthenticated(false)
            setLoading(false)
            return;
        }

        try {
            const res = await fetchWithAuth('/auth/me')
            if (!res.ok) {
                throw new Error('Errore durante la verifica del token utente')
            }
            const data = await res.json()

            setToken(savedToken)
            updateUser(data)
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error)
            logout()
        } finally {
            setLoading(false)
        }

    }


    useEffect(() => {
        verifyTokenUser()
    }, [])

    async function login(email, password) {
        try {
            const res = await fetch('http://localhost:5000/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 404) toast.error("E-mail errata");
                else if (res.status === 401) toast.error("Password errata");
                else toast.error(data.message || "Errore login");
                return false;
            }

            setIsAuthenticated(true)
            setToken(data.token)
            setUser(data.user)

            localStorage.setItem("gym_token", data.token)
            localStorage.setItem("gym_user", JSON.stringify(data.user))
            return true;
        } catch (error) {
            console.error("Errore login:", error.message);
            return false;
        }
    }


    async function register(name, email, password) {
        try {
            const res = await fetch('http://localhost:5000/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 409) toast.error("E-mail già registrata");
                else toast.error(data.message || "Errore registrazione");
                return false;
            }
            await login(email, password)
            navigate('/home')
            return true;
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
                setLoading,
                logout,
                login,
                fetchWithAuth,
                updateUser,
                register

            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
export const useGlobalContext = () => useContext(GlobalContext);
