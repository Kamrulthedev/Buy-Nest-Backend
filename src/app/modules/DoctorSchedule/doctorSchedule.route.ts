import express from 'express';
import { UserRole } from '@prisma/client';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { DoctorScheduleControllers } from './doctorSchedule.controllar';
import { DoctorScheduleValidation } from './doctorSchedule.validation';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
    // DoctorScheduleController.getAllFromDB
);

router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    // DoctorScheduleController.getMySchedule
)

router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(DoctorScheduleValidation.CreateInsert),
    DoctorScheduleControllers.InsertIntoDB
);

router.delete(
    '/:id',
    auth(UserRole.DOCTOR),
    // DoctorScheduleController.deleteFromDB
);


export const DoctorScheduleRoutes = router;