import { useGlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

export default function ProtectedRoute({children}){
const {isAuthenticated, loading} = useGlobalContext()
const navigate = useNavigate()



useEffect(() => {
  if (!loading && !isAuthenticated) {
    toast.error("Sessione scaduta, effettua il login");
    navigate('/login');   
  }
}, [loading, isAuthenticated]);

if (!isAuthenticated) {
  return null;
}

return children

}