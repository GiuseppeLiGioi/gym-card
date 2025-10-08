import { useState } from "react"

export default function CreateSheetModal({showModal, onClose, onSave}){

 const [titleSheet, setTitleSheet] = useState("")
  const [themeSheet, setThemeSheet] = useState("")


    return(
        showModal &&(
        <div className="container-modal">
            <div className="container-modal-inner">
                <h2 className="modal-title">CREA LA TUA SCHEDA</h2>

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
                placeholder="Inserisci il titolo della scheda"
                value={themeSheet}
                onChange={(e) => setThemeSheet(e.target.value)}    
                />
                </div>   
              
            </div>

            <div className="container-modal-bottom">
                <button className="btn-modal" onClick={ () => onSave(titleSheet, themeSheet)}>Salva Scheda</button>
                <button className="btn-modal" onClick={onClose}>Chiudi</button>
            </div>  

        </div>
        )
    )
}