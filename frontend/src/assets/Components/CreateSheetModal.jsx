import { useState, useEffect } from "react"

export default function CreateSheetModal({showModal, onClose, onSave, initialTheme="", initialTitle="", modalTitle = "CREA LA TUA SCHEDA", modalMessage = "Inserisci titolo e tema della scheda"}){

 const [titleSheet, setTitleSheet] = useState(initialTitle)
const [themeSheet, setThemeSheet] = useState(initialTheme)

useEffect(() => {
    setTitleSheet(initialTitle);
    setThemeSheet(initialTheme);
}, [initialTitle, initialTheme]);

if(!showModal) return null;


    return(
        showModal &&(
        <div className="container-modal">
            <div className="container-modal-inner">
                <h2 className="modal-title">{modalTitle}</h2>
                <p className="p-confirm-modal">{modalMessage}</p>

                <div className="container-input-modal">
                <label htmlFor="title">Titolo Scheda</label>
                
                <input 
                type="text"
                placeholder="Inserisci il titolo della scheda"
                value={titleSheet}
                onChange={(e) => setTitleSheet(e.target.value)}    
                />
                </div> 



                <div className="container-input-modal">
                <label htmlFor="theme">Tema Scheda</label>
                
                <input 
                type="text"
                placeholder="Inserisci il tema della scheda"
                value={themeSheet}
                onChange={(e) => setThemeSheet(e.target.value)}    
                />
                </div>   
              
            <div className="container-modal-bottom">
                <button className="btn-modal" type="button" onClick={ () => onSave(titleSheet, themeSheet)}>Salva Scheda</button>
                <button className="btn-modal" type="button" onClick={onClose}>Chiudi</button>
            </div>  
            </div>


        </div>
        )
    )
}