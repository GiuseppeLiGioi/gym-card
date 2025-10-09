import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useGlobalContext } from "../contexts/GlobalContext"

export default function SingleSheetPage() {
    const location = useLocation()
    const { title, theme } = location.state || {}
    const [showExerciseModal, setShowExerciseModal] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(null)
    const [exercises, setExercises] = useState([])
    const [sheet, setSheet] = useState(null)

    const { sheetId } = useParams()
    const { fetchWithAuth, setLoading } = useGlobalContext()


    async function handleSave(title, sets, reps, weight, image) {
        setLoading(true);
        try {
            if (!currentExercise?.id) {
                // CREATE
                const res = await fetchWithAuth(`/sheets/${sheetId}/exercises`, {
                    method: "POST",
                    body: JSON.stringify({ sheet_id: sheetId, name: title, sets, reps, weight, image })
                });
                const data = await res.json();
                setExercises(prev => [...prev, { id: data.id, name: data.title, sets: data.sets, reps: data.reps, weight: data.weight, image: data.image }]);
            } else {
                // UPDATE
                const res = await fetchWithAuth(`/sheets/${sheetId}/exercises/${currentExercise.id}`, {
                    method: "PUT",
                    body: JSON.stringify({ sheet_id: sheetId, name: title, sets, reps, weight, image })
                });
                const data = await res.json();
                setExercises(prev => prev.map(e => e.id === currentExercise.id ? { ...e, name: data.title, sets: data.sets, reps: data.reps, weight: data.weight, image: data.image } : e));
            }

            setCurrentExercise(null);
            setShowExerciseModal(false);
        } catch (error) {
            console.error(error);
            toast.error("Non è stato possibile completare l'operazione");
        } finally {
            setLoading(false);
        }
    }




    
    async function showExercises() {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`/sheets/${sheetId}/exercises`, {method: "GET"})
            if(!res.ok) throw new Error("Errore nella comunicazione server")

                const data = await res.json()
                setExercises(data)
        } catch (error) {
        console.error(error);
        toast.error("Non è stato possibile mostrare gli esercizi");
        } finally {
            setLoading(false);
        }
    }


    async function deleteExercises(exerciseId) {
      setLoading(true);
    
      try {
        console.log("Eliminazione esercizio con ID:", exerciseId);
    
        const res = await fetchWithAuth(`/sheets/${sheetId}/exercises${exerciseId}`, {
          method: 'DELETE'
        });
    
        if (!res.ok) {     
          console.error("Errore dal server");
          throw new Error("Errore nell'eliminare la scheda");
        }
    
        const data = await res.json();
        
    
        setExercises(prev => prev.filter((p) => p.id !== exerciseId));
    
      } catch (error) {
        console.error(error);
        toast.error("Errore nell'eliminazione della scheda");
      } finally {
        setLoading(false);
      }
    }
    



    return (
        <>

            <div className="container-singleSheet-Page">
                <h1 className="title-singleSheet">{title}</h1>
                <h4 className="theme-singleSheet">{theme}</h4>
                <div className="container-singleSheet-right">
                    <button className='btn-plus' type='button' onClick={() => { setShowExerciseModal(true), setCurrentExercise(null) }}>
                        {<FontAwesomeIcon icon={faPlus} />}
                    </button>
                </div>

            </div>

            <div className="container-exercises">
                

            </div>
        </>
    )
}