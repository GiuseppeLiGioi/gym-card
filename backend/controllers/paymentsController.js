const express = require('express');
const connection = require('../data/db');
const { promisify } = require('util');

const Stripe = require('stripe')



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

console.log("🔑 Stripe key:", process.env.STRIPE_SECRET_KEY);
const paymentsController = {
    createPayment: async (req, res) => {
        const userId = req.user.userId;
        const { itemId, itemType, title, amount, currency } = req.body;

        if (!itemId || !itemType || !title || !amount || !currency) {
            return res.status(400).json({ error: "Dati mancanti per il pagamento" });
        }

        console.log("🟢 Creazione pagamento per utente:", userId, req.body);
        const insertQuery = `
  INSERT INTO payments (user_id, product_name, amount, status, payment_intent_id, created_at)
  VALUES (?, ?, ?, 'pending', NULL, NOW())
`;

        try {
            const query = promisify(connection.query).bind(connection);
            const results = await query(insertQuery, [userId, title, Math.round(amount)]);
            const paymentId = results.insertId;

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: [{
                    price_data: {
                        currency: currency,
                        product_data: { name: title },
                        unit_amount: Math.round(amount),
                    },
                    quantity: 1
                }],
                metadata: { userId, paymentId },
                success_url: `${process.env.FRONTEND_APP}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.FRONTEND_APP}/checkout/cancel`
            });

            res.status(200).json({ url: session.url });

        } catch (err) {
            console.error("❌ ERRORE PAYMENT:", err);
            res.status(500).json({ error: "Errore nel processo di pagamento" });
        }

    }
};

module.exports = paymentsController;
