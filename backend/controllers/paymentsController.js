const express = require('express');
const Stripe = require('stripe')
const router = express.Router();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const payments = {
    createPayment: (req, res) => {
        const userId = req.user.userId;
        const { itemId, itemType, title, amount, currency } = req.body;

        // Validazioni base
        if (!itemId || !itemType || !title || !amount || !currency) {
            return res.status(400).json({ error: "Dati mancanti per il pagamento" });
        }

        // Inserimento nel DB con status pending
        const insertQuery = `
        INSERT INTO payments (user_id, item_id, item_type, title, amount, currency, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
    `;

        connection.query(insertQuery, [userId, itemId, itemType, title, amount, currency], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });

            const paymentId = results.insertId;

            // Qui chiamerai Stripe per creare PaymentIntent/Checkout Session
            // Poi ritorni al frontend client_secret o url
        });
    }

}

module.exports = router;
