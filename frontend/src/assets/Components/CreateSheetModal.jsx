import { useState, useEffect } from "react"

export default function CreateSheetModal({ showModal, onClose, onSave, initialTheme = "", initialTitle = "", modalTitle = "CREA LA TUA SCHEDA", modalMessage = "Inserisci titolo e tema della scheda" }) {

    const [titleSheet, setTitleSheet] = useState(initialTitle)
    const [themeSheet, setThemeSheet] = useState(initialTheme)

    useEffect(() => {
        setTitleSheet(initialTitle);
        setThemeSheet(initialTheme);
    }, [initialTitle, initialTheme]);

    if (!showModal) return null;


    return (
        showModal && (
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
                        <select
                            id="theme"
                            value={themeSheet}
                            onChange={(e) => setThemeSheet(e.target.value)}
                            required
                            className="input-modal"
                        >
                            <option value="">Seleziona il tema</option>
                            <option value="Cardio">Cardio</option>
                            <option value="Bodybuilding">Bodybuilding</option>
                            <option value="Strength">Strength</option>
                            <option value="Yoga/Stretching">Yoga / Stretching</option>
                            <option value="Functional/HIIT">Functional / HIIT</option>
                        </select>

                    </div>

                    <div className="container-modal-bottom">
                        <button className="btn-modal" type="button" onClick={() => onSave(titleSheet, themeSheet)}>Salva Scheda</button>
                        <button className="btn-modal" type="button" onClick={onClose}>Chiudi</button>
                    </div>
                </div>


            </div>
        )
    )
}