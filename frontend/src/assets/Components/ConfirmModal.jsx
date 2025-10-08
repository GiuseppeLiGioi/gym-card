

export default function ConfirmModal({ showModal, onClose, onConfirm, message, title }) {
  if(!showModal) return null;
    return (
        showModal && (
            <div className="container-confirm-modal">

                <div className="container-confirm-modal-inner">
                    <h2 className="title-confirm-modal">{title}</h2>
                    <p className="p-confirm-modal">{message}</p>

                    <div className="container-confirm-modal-bottom">
                    <button className="btn-confirm" type="button" onClick={onConfirm}>Si, Salva</button>
                    <button className="btn-confirm" type="button" onClick={onClose}>Chiudi</button>
                    </div>

                </div>


            </div>
        )
    )
}