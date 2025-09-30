import express from 'express';
import { authController } from '../controllers/authController';

const router = express.Router();

// Rotta generica solo per verificare il corretto funzionamento
router.get('/', (req, res) => {
    res.json({ message: 'Auth route funzionante' });
});

export default router;
