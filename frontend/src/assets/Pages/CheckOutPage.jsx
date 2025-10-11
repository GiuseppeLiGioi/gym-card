import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useGlobalContext } from '../contexts/GlobalContext';
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);




export default function CheckOutPage() {
    const { setLoading, fetchWithAuth, } = useGlobalContext()
    const location = useLocation()
    const [selectedProduct, setSelectedProduct] = useState(null)


    async function handlePayment(selectedProduct) {
        setLoading(true)

        try {
            if (!selectedProduct) throw new Error("Nessun prodotto selezionato");

            const dataToSend = selectedProduct
                ? {
                    itemId: selectedProduct.id,
                    itemType: selectedProduct.duration ? "plan" : "course",
                    title: selectedProduct.title,
                    amount: Math.round(parseFloat(selectedProduct.price) * 100),
                    currency: "eur"
                }
                : null;



            const res = await fetchWithAuth('/api/payments/create', {
                method: 'POST',
                body: JSON.stringify(dataToSend)
            })
        if(!res.ok) throw new Error('Errore nella risposta dell elaborazione del pagamento')

            const data = await res.json()

            window.location.href = data.url;



        } catch (error) {
            console.error(error)
        }finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        if (location?.state.plan) setSelectedProduct(location.state.plan);
        else if (location?.state.course) setSelectedProduct(location.state.course);
    }, [location.state])



    return (
        <div className="checkout-page">
            <section className="checkout-hero">
                <h1 className="checkout-title">Riepilogo del tuo acquisto</h1>
            </section>

            <div className="container-checkout">
                {selectedProduct && (
                    <div className="checkout-summary">
                        <div className="checkout-image">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                            />
                        </div>

                        <div className="checkout-details">
                            <h2 className="checkout-item-title">{selectedProduct.title}</h2>
                            <p className="checkout-item-description">{selectedProduct.description}</p>

                            {selectedProduct.duration && (
                                <p className="checkout-item-duration">
                                    <strong>Durata:</strong> {selectedProduct.duration}
                                </p>
                            )}

                            {selectedProduct.level && (
                                <p className="checkout-item-level">
                                    <strong>Livello:</strong> {selectedProduct.level}
                                </p>
                            )}

                            <p className="checkout-item-price">
                                <strong>Prezzo:</strong> €{selectedProduct.price}
                            </p>
                        </div>
                    </div>
                )}

                <div className="checkout-actions">
                    <button className="btn-checkout" onClick={() => handlePayment(selectedProduct)}>
                        Procedi al pagamento
                    </button>
                </div>
            </div>
        </div>
    )
}