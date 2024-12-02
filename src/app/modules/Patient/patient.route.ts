import express from 'express';
import { PatientController } from './patient.controllar';

const router = express.Router();

router.get('/', PatientController.GetAllFromDB);

// router.get(
//     '/:id',
//     PatientController.getByIdFromDB
// );

// router.patch(
//     '/:id',
//     PatientController.updateIntoDB
// );

// router.delete(
//     '/:id',
//     PatientController.deleteFromDB
// );
// router.delete(
//     '/soft/:id',
//     PatientController.softDelete
// );

export const PatientRoutes = router;