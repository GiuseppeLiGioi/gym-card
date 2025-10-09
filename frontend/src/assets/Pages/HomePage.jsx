import Spinner from "../Components/Spinner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import CreateSheetModal from '../Components/CreateSheetModal';
import ConfirmModal from '../Components/ConfirmModal';




export default function HomePage() {
    const [showModal, setShowModal] = useState(false)
    const [sheets, setSheets] = useState([])
    const [currentSheet, setCurrentSheet] = useState({})
    const { setLoading, fetchWithAuth, token, loading } = useGlobalContext()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const navigate = useNavigate()
    function onClose() {
        setShowModal(false)
    }

    async function onSave(titleSheet, themeSheet) {
        setLoading(true);
        try {
            if (currentSheet?.id) {
                // UPDATE (solo se è presente un id scheda)
                const res = await fetchWithAuth(`/sheets/${currentSheet.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title: titleSheet, theme: themeSheet })
                });
                if (!res.ok) throw new Error("Errore nell'aggiornare la scheda");

                setSheets(prev => prev.map(s => s.id === currentSheet.id ? { ...s, title: titleSheet, theme: themeSheet } : s));

                
            } else {
                // CREATE (se non è presente id scheda, fa la create)
                const res = await fetchWithAuth('/sheets', {
                    method: 'POST',
                    body: JSON.stringify({ title: titleSheet, theme: themeSheet })
                });
                if (!res.ok) throw new Error("Errore nel creare la scheda");
                const data = await res.json();
                setSheets(prev => [...prev, { id: data.sheetId, title: titleSheet, theme: themeSheet }]);
            }

            setShowModal(false);
            setCurrentSheet(null);

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }


async function deleteSheet(sheetId) {
  setLoading(true);

  try {
    console.log("Eliminazione scheda con ID:", sheetId);

    const res = await fetchWithAuth(`/sheets/${sheetId}`, {
      method: 'DELETE'
    });

    console.log("Status:", res.status);

    if (!res.ok) {
      const errText = await res.text();
      console.error("Errore dal server:", errText);
      throw new Error("Errore nell'eliminare la scheda");
    }

    const data = await res.json();
    console.log("Risposta eliminazione:", data);

    setSheets(prev => prev.filter((p) => p.id !== sheetId));

  } catch (error) {
    console.error(error);
    toast.error("Errore nell'eliminazione della scheda");
  } finally {
    setLoading(false);
  }
}




    async function fetchSheets() {
        setLoading(true)

        try {
            const res = await fetchWithAuth('/sheets', { method: 'GET' })
            if (!res.ok) throw new Error("Errore nel caricamento delle schede");


            const data = await res.json()

            setSheets(data.sheets || data || [])


        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => setLoading(false), 300);
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchSheets()
    }, [token])

    return (
        <>
        {loading && <Spinner />}

            <div className="container-homepage">
                <h1 className="title-home">LE TUE SCHEDE</h1>
                <button className='btn-plus' type='button' onClick={() => { setShowModal(true), setCurrentSheet(null) }}>
                    {<FontAwesomeIcon icon={faPlus} />}
                </button>
            </div>


            <div className='container-sheets'>
                {
                    sheets.map((s) => (
                        <div className='container-single-sheet' key={s.id}>
                            <div className='container-info-sheet'>
                                <h2 className='title-sheet'>{s.title}</h2>
                                <h4 className='theme-sheet'>{s.theme}</h4>
                            </div>

                            <div className='container-button-sheet'>

                                <button type='button' className='btn-sheet' onClick={() => {
                                    setCurrentSheet(s);
                                    setShowModal(true);
                                }}>
                                    Modifica</button>

                                <button
                                    type='button'
                                    className='btn-sheet green'
                                    onClick={() => navigate(`/sheets/${s.id}`, {state: {title: s.title, theme: s.theme}})}
                                >
                                    Apri
                                </button>

                                <button type='button' className='btn-sheet' onClick={() => {
                                    setCurrentSheet(s.id);
                                    setShowConfirmModal(true);
                                }}>
                                    Elimina</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <CreateSheetModal
                showModal={showModal}
                onClose={onClose}
                onSave={onSave}
                modalTitle={currentSheet?.id ? 'MODIFICA SCHEDA' : 'CREA SCHEDA'}
                modalMessage={currentSheet?.id ? 'Modifica il titolo e il tema della scheda' : 'Inserisci il titolo ed il tema della scheda'}
            />

            <ConfirmModal
                showModal={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={() => {
                    deleteSheet(currentSheet);
                    setShowConfirmModal(false);
                }}
                title="Conferma eliminazione Scheda"
                message="Sei sicuro di voler eliminare questa scheda?"
            />
        </>


    )
}
