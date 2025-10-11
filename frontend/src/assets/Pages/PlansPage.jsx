import { useNavigate } from "react-router-dom";
import bannerImg from '../../images/courses/banner2.png';
import gymImg from '../../images/courses/gym.png'; 

export default function PlansPage() {
    const navigate = useNavigate();

    const plansData = [
        {
            id: 1,
            title: "Abbonamento Palestra",
            description: "Accesso completo alla struttura e alle attrezzature della palestra.",
            duration: "1 mese",
            price: "29.99",
            image: gymImg
        },
        {
            id: 2,
            title: "Abbonamento Palestra",
            description: "Accesso completo alla struttura e alle attrezzature della palestra.",
            duration: "3 mesi",
            price: "79.99",
            image: gymImg
        },
        {
            id: 3,
            title: "Abbonamento Palestra",
            description: "Accesso completo alla struttura e alle attrezzature della palestra.",
            duration: "1 anno",
            price: "299.99",
            image: gymImg
        }
    ];

    return (
        <>
            <section className="courses-hero">
                <img src={bannerImg} alt="Banner abbonamenti" className="banner-img" />
            </section>

            <div className="container-courses">
                {plansData.map((p) => (
                    <div className="container-single-course" key={p.id}>
                        <div className="container-course-header">
                            <h2 className="title-course">{p.title}</h2>
                            <p className="description-course">{p.description}</p>
                            <p className="description-course"><strong>Durata:</strong> {p.duration}</p>
                        </div>

                        <div className="container-course-center">
                            <img src={p.image} alt={`Abbonamento ${p.duration}`} />
                        </div>

                        <div className="container-course-bottom">
                            <p className="level-course">{p.duration}</p>
                            <p className="price-course">{p.price}</p>
                        </div>

                        <button 
                            className="btn-course" 
                            onClick={() => navigate('/checkout', { state: { plan: p } })}
                        >
                            Sottoscrivi
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}
