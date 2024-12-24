import { Router } from 'express';
import { PaymentControllars } from './payment.controllar';

const router = Router();

// Route to create an order
router.post('/initiale', PaymentControllars.initialeDB);

router.post('/confirmation', PaymentControllars.confirmantionDB);

export const PaymentRoutes = router;
