import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../contexts/GlobalContext"
import { useState } from "react"
import {toast} from "react-toastify"
export default function AuthenticationPage(){
const {login} = useGlobalContext()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const navigate = useNavigate()

async function handleLogin(){
    const success = await login(email, password);
    if(success){
    toast.success("Login effettuato con successo")
     navigate('/home')
    }else{
    toast.error("Credenziali errate")
    }
}
    return(
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

            <button className="btn-login" onClick={handleLogin}>Accedi</button>

        </div>
    )
}