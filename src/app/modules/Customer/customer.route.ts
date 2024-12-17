import express from 'express';
import { CustomerControllers } from './customer.controllar';
import { auth } from '../../middlewares/auth';
import { UserRole } from '@prisma/client';


const router = express.Router();

router.get('/all-customer', auth(UserRole.ADMIN), CustomerControllers.GetAllCustomerDB);

router.get(
    '/:id',
    CustomerControllers.GetByIdCustomerDB
);




export const CustomerRoutes = router;