import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

export default function CheckOutPage() {
    const location = useLocation()
    const [selectedProduct, setSelectedProduct] = useState(null)

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
                    <button className="btn-checkout">
                        Procedi al pagamento
                    </button>
                </div>
            </div>
        </div>
    )
}