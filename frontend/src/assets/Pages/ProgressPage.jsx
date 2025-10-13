import ProgressBar from "../Components/ProgressBar"
import Spinner from "../Components/Spinner"
import { useState, useEffect } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";


export default function ProgressPage() {
    const [sheets, setSheets] = useState([]);
    const { fetchWithAuth, setLoading, loading } = useGlobalContext();


    useEffect(() => {
        async function fetchSheets() {
            setLoading(true);
            try {
                const res = await fetchWithAuth("/sheets", { method: "GET" });
                if (!res.ok) throw new Error("Errore nel caricamento delle schede");
                const data = await res.json();
                setSheets(data.sheets || data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchSheets();
    }, []);


    const completedSheets = sheets.filter(s => s.completed);
    const completedThemes = completedSheets.map(s => s.theme);

    let bonus = 0;
    if (completedThemes.includes("Cardio")) bonus += 2;
    if (completedThemes.includes("Bodybuilding")) bonus += 3;
    if (completedThemes.includes("Crossfit")) bonus += 2;
    if (completedThemes.includes("Powerlifting")) bonus += 3;
    if (completedThemes.includes("Yoga")) bonus += 1;

    const completedCount = completedSheets.length;
    const totalCount = sheets.length;

    const baseProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const totalProgress = Math.min(baseProgress + bonus, 100);



     if (loading) return <Spinner />;
    if (!sheets.length) {
        return <p className="no-sheets-msg">Non hai ancora creato alcuna scheda</p>;
    }
    return (
        <div className="progress-page">
            <h1 className="progress-title">I tuoi progressi</h1>
            <ProgressBar progress={totalProgress} />

            <div className="progress-legend">
                <p className="p-progressPage">📋 Schede completate: {completedCount}/{totalCount}</p>
                <p className="p-progressPage">🔥 Bonus tematici:</p>
                <ul>
                    <li className="li-legend-progress">+2% per Cardio</li>
                    <li className="li-legend-progress">+3% per Bodybuilding</li>
                    <li className="li-legend-progress">+2% per Crossfit</li>
                    <li className="li-legend-progress">+3% per Powerlifting</li>
                    <li className="li-legend-progress">+1% per Yoga</li>
                </ul>
            </div>
        </div>
    );

}