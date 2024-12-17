import express from 'express';
import { CustomerControllers } from './customer.controllar';


const router = express.Router();

router.get('/all-customer', CustomerControllers.GetAllCustomerDB);

// router.get(
//     '/:id',
//     PatientControllers.GetByIdFromDB
// );




export const CustomerRoutes = router;