import { useNavigate } from "react-router-dom"
import bodybuildingImg from "../../images/courses/bodybuilding.jpg";
import cardioImg from "../../images/courses/cardio.jpg";
import yogaImg from "../../images/courses/yoga.jpg";
import functionalImg from "../../images/courses/functional.jpg";
import crossfitImg from "../../images/courses/crossfit.jpg";
import pilatesImg from "../../images/courses/pilates.jpg";
import bannerImg from '../../images/courses/banner.png';



export default function CoursesPage() {
    const navigate = useNavigate()
    const coursesData = [
        {
            id: 1,
            title: "Bodybuilding Base",
            description: "Impara le fondamenta dell’allenamento con i pesi e costruisci forza in modo sicuro.",
            level: "Principiante",
            price: "39.99",
            image: bodybuildingImg
        },
        {
            id: 2,
            title: "Cardio Fitness",
            description: "Allenamenti ad alta intensità per migliorare la resistenza e bruciare calorie in modo dinamico.",
            level: "Intermedio",
            price: "34.99",
            image: cardioImg
        },
        {
            id: 3,
            title: "Yoga & Mobility",
            description: "Ritrova equilibrio e flessibilità con sessioni di yoga guidate per corpo e mente.",
            level: "Tutti i livelli",
            price: "29.99",
            image: yogaImg
        },
        {
            id: 4,
            title: "Functional Training",
            description: "Allenati in modo completo con circuiti funzionali per forza, coordinazione e resistenza.",
            level: "Avanzato",
            price: "44.99",
            image: functionalImg
        },
        {
            id: 5,
            title: "CrossFit Challenge",
            description: "Spingi i tuoi limiti con workout intensi e mirati a potenza, forza e resistenza globale.",
            level: "Avanzato",
            price: "49.99",
            image: crossfitImg
        },
        {
            id: 6,
            title: "Pilates Core",
            description: "Allenamento a corpo libero focalizzato su postura, stabilità e tonificazione profonda.",
            level: "Intermedio",
            price: "32.99",
            image: pilatesImg
        }
    ];


    return (
        <>

            <section className="courses-hero">
                <img src={bannerImg} alt="Banner corsi" className="banner-img" />
            </section>


            <div className="container-courses">
                {
                    coursesData.map((c) => (
                        <div className="container-single-course" key={c.id}>
                            <div className="container-course-header">
                                <h2 className="title-course">{c.title}</h2>
                                <p className="description-course">{c.description}</p>
                            </div>

                            <div className="container-course-center">
                                <img src={c.image} alt={`Corso ${c.title}`} />
                            </div>

                            <div className="container-course-bottom">
                                <p className="level-course">{c.level}</p>
                                <p className="price-course">{c.price}</p>
                            </div>
                            <button className="btn-course" onClick={() => navigate('/checkout', { state: { course: c } })}
                            >Iscriviti
                            </button>
                        </div>
                    ))
                }
            </div>
        </>

    )
}