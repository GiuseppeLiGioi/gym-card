import { useGlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({children}){
const {isAuthenticated, loading} = useGlobalContext()
const navigate = useNavigate()

if(loading){
    return(
 <div className="spinner-container">
    <div className="spinner"></div>
</div>
)
}useEffect(() => {
  if (!loading && !isAuthenticated) {
    toast.error("Sessione scaduta, effettua il login");
    navigate('/login');
  }
}, [loading, isAuthenticated, navigate]);
if (!loading && isAuthenticated) {
  return children;
}

   

}