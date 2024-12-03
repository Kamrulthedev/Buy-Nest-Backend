import express from 'express';
import { PatientControllers } from './patient.controllar';


const router = express.Router();

router.get('/', PatientControllers.GetAllFromDB);

router.get(
    '/:id',
    PatientControllers.GetByIdFromDB
);


router.patch(
    '/update/:id',
    PatientControllers.UpdateIntoDB
);


router.delete(
    '/delete/:id',
    PatientControllers.DeleteFromDB
);
// router.delete(
//     '/soft/:id',
//     PatientController.softDelete
// );

export const PatientRoutes = router;