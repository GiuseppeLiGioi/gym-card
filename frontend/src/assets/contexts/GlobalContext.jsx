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
        const headers = {
            ...(options.headers || {}),
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        try{     
        const res = await fetch(url, { ...options, headers })
            
        if(!res.ok){
            toast.error("Errore di connessione al server")
        }
            
        if (res.status === 401) {
            logout()
            navigate('/login')
        }
        return res;

        }catch(error){
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
            if (!res.ok) throw new Error(data.message || "Errore Login")

            setIsAuthenticated(true)
            setToken(data.token)
            setUser(data.user)

            localStorage.setItem("gym_token", data.token)
            localStorage.setItem("gym_user", JSON.stringify(data.user))
            return true;
        } catch (error) {
            console.error("Errore login:", error.message);
            toast.error("Non è stato possibile effettuare il login")
            return false;
        }
    }

    
    async function register(name, email, password) {
        try {
            const res = await fetch('http://localhost:5000/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name, email, password })
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.message || "Errore Registrazione")
            await login(email, password)
            navigate('/home')
            return true;
        } catch (error) {
            console.error("Errore login:", error.message);
            toast.error("Non è stato possibile effettuare la registrazione")
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
