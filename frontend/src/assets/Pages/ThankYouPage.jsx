import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import bannerThankYou from '../../images/courses/bannerHome.png'; 


export default function ThankYouPage() {
    const navigate = useNavigate();

    return (
        <div className="thankyou-page">
            <section className="thankyou-hero">
                <img src={bannerThankYou} alt="Grazie per il tuo acquisto!" className="thankyou-banner" />
            </section>

            <div className="thankyou-content">
                <h1 className="thankyou-title">Grazie per il tuo acquisto!</h1>
                <p className="thankyou-message">
                    La tua transazione è stata completata con successo.
                    Ora puoi accedere ai contenuti e iniziare il tuo percorso!
                </p>

                <button
                    className="btn-home"
                    onClick={() => navigate('/')}
                >
                    <FontAwesomeIcon icon={faHouse} /> Torna alla Home
                </button>
            </div>
        </div>
    );
}
