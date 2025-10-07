import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';



export default function HomePage() {

const [showModal, setShowModal] = useState(false)
const [sheets, setSheets] = useState([])
const [currentSheet, setCurrentSheet] = useState({})
const {setLoading, fetchWithAuth, token} = useGlobalContext()

async function fetchSheets(){
setLoading(true)

try{
const res = await fetchWithAuth('/sheets', { method: 'GET' })
if(!res.ok) throw new Error("Errore nel caricamento delle schede");


const data = await res.json()

setSheets(data.sheets || data || [])


}catch(error){
console.error(error)
}finally {
setLoading(false);
}
}

useEffect(() => {
if(token){
fetchSheets()
}
}, [token])

    return(
        <div className="container-homepage">
           <h1 className="title-home">LE TUE SCHEDE</h1>
           <button className='btn-plus' onClick={() => {setShowModal(true), setCurrentSheet(null)}}>
            {<FontAwesomeIcon icon={faPlus} />}
           </button>
        </div>
    )
 }
