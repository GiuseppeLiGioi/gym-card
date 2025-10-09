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
        setLoading(true)
        try {
            if (!currentExercise?.id) {
                const res = await fetchWithAuth(`/sheets/${sheetId}/exercises`, {
                    method: "POST",
                    body: JSON.stringify({ sheet_id: sheetId, name: nameExercise, sets: setsExercise, reps: repsExercise, weight: weightExercise, image: imageExercise })
                })
                if (!res.ok) {
                    throw new Error('errore nella creazione di un esercizio')
                }
                const data = await res.json()
                setExercises(prev => [...prev, { id: data.id, name: nameExercise, sets: data.setsExercise, reps: data.repsExercise, weight: data.weightExercise, image: data.imageExercise }])



            } else { currentExercise?.id } {
                const res = await fetchWithAuth(`/sheets/${sheetId}/exercises/${currentExercise.id}`, {
                    method: "POST",
                    body: JSON.stringify({ sheet_id: sheetId, name: nameExercise, sets: setsExercise, reps: repsExercise, weight: weightExercise, image: imageExercise })
                })

                if (!res.ok) {
                    throw new Error('errore nella creazione di un esercizio')
                }
                const data = await res.json()
                setExercises(prev => prev.map(e => e.id === currentExercise.id ? {...e, id: data.id, name: nameExercise, sets: data.setsExercise, reps: data.repsExercise, weight: data.weightExercise, image: data.imageExercise } : e))
            }

        } catch (error) {
            console.error(error)
            toast.error("Non è stato possbile completare l'operazione")
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