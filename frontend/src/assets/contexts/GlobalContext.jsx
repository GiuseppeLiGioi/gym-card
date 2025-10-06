import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { verifyUser } from "../../../../backend/controllers/authController";

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

        const res = fetch(url, { ...options, headers })

        if (res.status === 401) {
            logout()
            toast.error("Sessione scaduta, effettua nuovamente il login")
            navigate('/login')
        }
        return res;
    }

    function updateUser (newUserData){
        setUser(newUserData)
        localStorage.setItem("gym_user", json.stringify(newUserData))
    }




    async function verifyTokenUser (){
        const savedToken = localStorage.getItem("gym_token")
        if(!savedToken){
            setIsAuthenticated(false)
            setLoading(false)
            return;
        }

        try{
            const res = await fetchWithAuth('/auth/me')
            if(!res.ok){
              throw new Error('Errore durante la verifica del token utente')
            }
            const data = await verifyUser.json()
            
            setToken(savedToken)
            updateUser(data)
            setIsAuthenticated(true)
        }catch(error){
            console.error(error)
            logout()
        }finally{
            setLoading(false)
        }

    }


    useEffect(() => {
       verifyTokenUser()
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
