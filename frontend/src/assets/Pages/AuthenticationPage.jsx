import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useState } from "react"
import { toast } from "react-toastify"
export default function AuthenticationPage() {
    const { login, register } = useGlobalContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const navigate = useNavigate()

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,50}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


    async function handleLogin() {
        setLoading(true)

        if (!emailRegex.test(email)) {
            toast.error("Email non valida");
            setLoading(false);
            return;
        }
        if (!password) {
            toast.error("Re-inserisci password");
            setLoading(false);
            return;
        }



        try {
            const success = await login(email, password)
            if (success) {
                toast.success("Login effettuato con successo")
                navigate("/home")
            } else {
                toast.error("Credenziali errate")
            }
        } catch (error) {
          console.error(error)
        } finally {
            setLoading(false)
        }

    }

    async function handleRegister() {
        setLoading(true)

        if (!nameRegex.test(name)) {
            setLoading(false)
            toast.error("campo nome non valido.")
            return;
        }
        else if (!emailRegex.test(email)) {
            setLoading(false)
            toast.error("campo email non valido. Deve contenere @ e dominio valido")
            return;
        }
        else if (!passwordRegex.test(password)) {
            setLoading(false)
            toast.error("campo password non valido. Deve contenere almeno 8 caratteri, una maiuscola ed un carattere speciale")
            return;
        }

        try {
            const success = await register(name, email, password)
            if (success) {
                toast.success("Registrazione effettuata con successo")
                navigate("/home")
            } else {
                toast.error("Impossibile effettuare la registrazione")
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }

    }
    return (
        <>
            {

                !isRegistering && (
                    <div className="container-login-form">

                        <input
                            type="text"
                            placeholder="Inserisci la tua e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Inserisci la tua password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn-login" onClick={handleLogin} disabled={loading}>Accedi</button>

                    </div>
                )
            }

            {

                isRegistering && (
                    <div className="container-register-form">
                        <input
                            type="text"
                            placeholder="Inserisci il tuo nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Inserisci la tua e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Inserisci la tua password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="btn-register" onClick={handleRegister} disabled={loading}>Registrati</button>

                    </div>
                )
            }



            <button onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Vai al login" : "Vai alla registrazione"}</button>
        </>




    )
}