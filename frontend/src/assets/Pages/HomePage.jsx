import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';
import CreateSheetModal from '../Components/CreateSheetModal';



export default function HomePage() {
    const [showModal, setShowModal] = useState(false)
    const [sheets, setSheets] = useState([])
    const [currentSheet, setCurrentSheet] = useState({})
    const { setLoading, fetchWithAuth, token } = useGlobalContext()

    function onClose() {
        setShowModal(false)
    }

   async function onSave(titleSheet, themeSheet) {
    setLoading(true);

    try {
        const res = await fetchWithAuth('/sheets', {
            method: 'POST',
            body: JSON.stringify({ title: titleSheet, theme: themeSheet })
        });

        if (!res.ok) throw new Error("Errore nell'inserire i campi scelti");

        const data = await res.json();

        // aggiungiamo la scheda appena creata allo stato e chiudo modale
        setSheets(prev => [...prev, { id: data.sheetId, title: titleSheet, theme: themeSheet }]);
        setShowModal(false);

    } catch (error) {
        console.error(error);
        toast.error("Errore nel salvataggio della scheda");
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
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!token) return;
        fetchSheets()
    }, [token])

    return (
        <>

            <div className="container-homepage">
                <h1 className="title-home">LE TUE SCHEDE</h1>
                <button className='btn-plus' onClick={() => { setShowModal(true), setCurrentSheet(null) }}>
                    {<FontAwesomeIcon icon={faPlus} />}
                </button>
            </div>

            <CreateSheetModal
                showModal={showModal}
                onClose={onClose}
                onSave={onSave} />

            <div className='container-sheets'>
                {
                    sheets.map((s, index) => (
                        <div className='container-single-sheet' key={index}>
                            <div className='container-info-sheet'>
                            <h2 className='title-sheet'>{s.title}</h2>
                            <h4 className='theme-sheet'>{s.theme}</h4>
                            </div>

                            <div className='container-button-sheet'>
                            <button className='btn-sheet'>Modifica</button>
                            <button className='btn-sheet'>Elimina</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>


    )
}
