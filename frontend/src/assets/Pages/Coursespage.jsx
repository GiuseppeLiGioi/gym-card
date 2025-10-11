export default function CoursesPage() {
    const coursesData = [
        {
            id: 1,
            title: "Bodybuilding Base",
            description: "Impara le fondamenta dell’allenamento con i pesi e costruisci forza in modo sicuro ed efficace.",
            level: "Principiante",
            price: "39.99",
            image: "/assets/courses/bodybuilding.jpg"
        },
        {
            id: 2,
            title: "Cardio Fitness",
            description: "Allenamenti ad alta intensità per migliorare la resistenza e bruciare calorie in modo dinamico.",
            level: "Intermedio",
            price: "34.99",
            image: "/assets/courses/cardio.jpg"
        },
        {
            id: 3,
            title: "Yoga & Mobility",
            description: "Ritrova equilibrio e flessibilità con sessioni di yoga guidate per corpo e mente.",
            level: "Tutti i livelli",
            price: "29.99",
            image: "/assets/courses/yoga.jpg"
        },
        {
            id: 4,
            title: "Functional Training",
            description: "Allenati in modo completo con circuiti funzionali per forza, coordinazione e resistenza.",
            level: "Avanzato",
            price: "44.99",
            image: "/assets/courses/functional.jpg"
        },
        {
            id: 5,
            title: "CrossFit Challenge",
            description: "Spingi i tuoi limiti con workout intensi e mirati a potenza, forza e resistenza globale.",
            level: "Avanzato",
            price: "49.99",
            image: "/assets/courses/crossfit.jpg"
        },
        {
            id: 6,
            title: "Pilates Core",
            description: "Allenamento a corpo libero focalizzato su postura, stabilità e tonificazione profonda.",
            level: "Intermedio",
            price: "32.99",
            image: "/assets/courses/pilates.jpg"
        }
    ];


    return (
        <>

            <section className="courses-hero">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1 className="hero-title">Scopri i nostri corsi</h1>
                        <p className="hero-subtitle">
                            Scegli il percorso che fa per te e inizia subito a migliorarti.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container-courses">

            </div>
        </>

    )
}