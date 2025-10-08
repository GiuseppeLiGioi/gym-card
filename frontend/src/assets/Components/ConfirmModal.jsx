import { useState } from "react"

export default function ConfirmModal({ showModal, onClose, onConfirm, message }) {
  if(!showModal) return null;
    return (
        showModal && (
            <div className="container-confirm-modal">

                <div className="container-confirm-modal-inner">
                    <h2 className="title-confirm-modal">Conferma azione</h2>
                    <p className="p-confirm-modal">{message}</p>

                    <div className="container-confirm-modal-bottom">
                    <button className="btn-confirm" onClick={onConfirm}>Si, Salva</button>
                    <button className="btn-confirm" onClick={onClose}>Chiudi</button>
                    </div>

                </div>


            </div>
        )
    )
}