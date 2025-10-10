import { useLocation, useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

import { useGlobalContext } from "../contexts/GlobalContext"
import CreateExercisesModal from "../Components/CreateExercisesModal"


export default function SingleSheetPage() {
    const location = useLocation()
    const { title, theme } = location.state || {}
    const [showExerciseModal, setShowExerciseModal] = useState(false)
    const [currentExercise, setCurrentExercise] = useState(null)
    const [exercises, setExercises] = useState([])
    const [sheet, setSheet] = useState(null)
    const [timer, setTimer] = useState(180)
    const [intervalId, setIntervalId] = useState(null)

    const { sheetId } = useParams()
    const { fetchWithAuth, setLoading } = useGlobalContext()

    async function handleSave(title, sets, reps, weight, imageFile, imageURL) {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("sheet_id", sheetId);
            formData.append("name", title);
            formData.append("sets", sets);
            formData.append("reps", reps);
            formData.append("weight", weight);
            if (imageFile instanceof File) formData.append("image", imageFile);
            else if (imageURL) formData.append("image_url", imageURL);

            const res = await fetch(`http://localhost:5000/sheets/${sheetId}/exercises`, {
                method: currentExercise?.id ? "PUT" : "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("gym_token")}`
                }
            });

            if (!res.ok) throw new Error("Errore nella creazione/modifica dell'esercizio");
            const data = await res.json();
            setExercises(prev => currentExercise?.id ? prev.map(e => e.id === currentExercise.id ? { ...e, ...data } : e) : [...prev, data]);
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
            const res = await fetchWithAuth(`/sheets/${sheetId}/exercises`, { method: "GET" })
            if (!res.ok) throw new Error("Errore nella comunicazione server")

            const data = await res.json()
            const exercisesArray = Array.isArray(data) ? data : data.exercises;

            for (let i = 0; i < exercisesArray.length; i++) {
                exercisesArray[i].completed = false
            }
            console.log("Esercizi recuperati:", exercisesArray);


            if (!exercisesArray || exercisesArray.length === 0) {
                toast.info("Ancora nessun esercizio creato");
                setExercises([]);
                return;
            }
            setExercises(exercisesArray)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    async function deleteExercises(exerciseId) {
        setLoading(true);

        try {
            console.log("Eliminazione esercizio con ID:", exerciseId);

            const res = await fetchWithAuth(`/sheets/${sheetId}/exercises/${exerciseId}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                console.error("Errore dal server");
                throw new Error("Errore nell'eliminare la scheda");
            }


            setExercises(prev => prev.filter((p) => p.id !== exerciseId));

        } catch (error) {
            console.error(error);
            toast.error("Errore nell'eliminazione della scheda");
        } finally {
            setLoading(false);
        }
    }



    function checkAllCompleted() {
        return exercises.every((e) => e.completed === true)
    }

    const intervalRef = useRef(null);

    function handleComplete(id) {
        setExercises((prevExercises) => {
            const updatedExercises = prevExercises.map((e) =>
                e.id === id ? { ...e, completed: !e.completed } : e
            );

            const allCompleted = updatedExercises.every((e) => e.completed);

            if (allCompleted && !intervalRef.current) {
                startTimer();
            } else if (!allCompleted && intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                setTimer(180);
            }

            return updatedExercises;
        });
    }

    function startTimer() {
        if (intervalRef.current) return;
        setTimer(180);

        intervalRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;


                    setExercises((prevExercises) =>
                        prevExercises.map((e) => ({ ...e, completed: false }))
                    );

                    setTimer(180);
                    return 180;
                }
                return prev - 1;
            });
        }, 1000);
    }












    useEffect(() => {
        showExercises()
    }, [sheetId])




    return (
        <>

            <div className="container-singleSheet-Page">
                <div className="container-singleSheet-left">
                    <h1 className="title-singleSheet">{title}</h1>
                    <h4 className="theme-singleSheet">{theme}</h4>
                </div>

                <div className="container-singleSheet-right">
                    <button
                        className="btn-plus-exercise"
                        type="button"
                        onClick={() => {
                            setShowExerciseModal(true);
                            setCurrentExercise(null);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>
            </div>

            <div className="container-timer">

                <div className="timer-pill">
                    <span className="timer-label">Recupero:</span>
                    <span className="timer-value">
                        {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
                    </span>


                </div>

            </div>


            <div className='container-exercise'>
                {
                    exercises.map((e) => (
                        <div key={e.id}
                            className={e.completed ? 'container-single-exercise completed' : 'container-single-exercise'}>

                            <div className='container-info-exercise'>
                                <div className="exercise-header">
                                    <h2 className='title-exercise'>
                                        <span className="span-exercise">Nome Esercizio</span>{e.name}
                                    </h2>
                                    <button
                                        className={`btn-complete-exercise ${e.completed ? 'completed' : ''}`}
                                        onClick={() => {
                                            handleComplete(e.id);
                                            checkAllCompleted();
                                            startTimer();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faCircleCheck} />
                                    </button>
                                </div>

                                <img
                                    className="image-exercise"
                                    src={e.image ? `http://localhost:5000${e.image}` : "/placeholder.png"}
                                    alt={e.name}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }} />


                                <div className="container-info-bottom-exercise">
                                    <h4 className='steps-exercise'>
                                        <span className="span-exercise">Serie</span>{e.sets}
                                    </h4>
                                    <p className="reps-exercise">
                                        <span className="span-exercise">Ripetizioni</span>{e.reps}
                                    </p>
                                    <p className="weight-exercise">
                                        <span className="span-exercise">Peso x rep.</span>{e.weight}
                                    </p>
                                </div>
                            </div>

                            <div className='container-button-exercise'>
                                <button type='button' className='btn-exercise' onClick={() => {
                                    setCurrentExercise(e);
                                    setShowExerciseModal(true);
                                }}>
                                    Modifica
                                </button>

                                <button type='button' className='btn-exercise' onClick={() => {
                                    deleteExercises(e.id);
                                    setCurrentExercise(e.id);
                                    setShowExerciseModal(false);
                                }}>
                                    Elimina
                                </button>
                            </div>
                        </div>

                    ))
                }
            </div>


            <CreateExercisesModal
                showExerciseModal={showExerciseModal}
                onClose={() => setShowExerciseModal(false)}
                onSave={handleSave}

                modalTitle={currentExercise?.id ? 'MODIFICA ESERCIZIO' : 'AGGIUNGI ESERCIZIO'}
                modalMessage={currentExercise?.id ? 'Modifica il titolo e il tema dell esercizio' : 'Inserisci il titolo ed il tema dell esercizio'}
            />

        </>
    )
}