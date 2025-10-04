import { useGlobalContext } from "../contexts/GlobalContext"
import { useNavigate } from "react-router-dom"

export default function ProtectedRoute({children}){
const {isAuthenicated, loading} = useGlobalContext()
const navigate = useNavigate()

if(loading){
 <div className="spinner-container">
    <div className="spinner"></div>
</div>
}else if(!isAuthenicated){
navigate('/login')
}else if(isAuthenicated){
return children;
}
   

}