import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

export default function CreateExercisesModal(){
const [titleExercise, setTitleExercise] = useState("")
const [setsExercise, setSetsExercise] = useState(0)
const [repsExercise, setRepsExercise] = useState(0)
const [weightExercise, setWeightExercise] = useState(0)
const [imageExercise, setImageExercise] = useState("")


    return(
        showModal &&(
        <div className="container-modal">
            <div className="container-modal-inner">
                <h2 className="modal-title">{modalTitle}</h2>
                <p className="p-confirm-modal">{modalMessage}</p>

                <div className="container-input-modal">
                <label htmlFor="title">Titolo esercizio: *</label>
                
                <input 
                type="text"
                placeholder="Inserisci il titolo dell'esercizio"
                value={titleExercise}
                onChange={(e) => setTitleExercise(e.target.value)}    
                />
                </div> 



                <div className="container-input-modal">
                <label htmlFor="theme">Numero serie: *</label>
                <input 
                type="number"
                placeholder="Inserisci numero serie esercizio"
                value={setsExercise}
                onChange={(e) => setSetsExercise(e.target.value)}    
                />
                </div>   

                <div className="container-input-modal">
                <label htmlFor="theme">Numero ripetizioni: *</label>
                <input 
                type="number"
                placeholder="Inserisci numero ripetizioni esercizio"
                value={repsExercise}
                onChange={(e) => setRepsExercise(e.target.value)}    
                />
                </div> 

                 <div className="container-input-modal">
                <label htmlFor="theme">Peso esercizio:</label>
                 <input 
                type="number"
                placeholder="Inserisci il peso dell' esercizio"
                value={weightExercise}
                onChange={(e) => setWeightExercise(e.target.value)}    
                />
                </div> 

                  <div className="container-input-modal">
                <label htmlFor="theme">Immagine esercizio:</label>
                 <input 
                type="text"
                placeholder="Inserisci l'url immagine dell' esercizio"
                value={imageExercise}
                onChange={(e) => setImageExercise(e.target.value)}    
                />
                </div> 

                
              
            <div className="container-modal-bottom">
                <button className="btn-modal" type="button" onClick={ () => onSave(titleExercise, setsExercise, repsExercise, weightExercise, imageExercise)}>Salva esercizio</button>
                <button className="btn-modal" type="button" onClick={onClose}>Chiudi</button>
            </div>  
            </div>


        </div>
        )
    )
}



               

               