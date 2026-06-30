import express from 'express';
import { initializePayment, verifyPayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/initialize', initializePayment);
router.post('/verify', protect, verifyPayment);

export default router;
