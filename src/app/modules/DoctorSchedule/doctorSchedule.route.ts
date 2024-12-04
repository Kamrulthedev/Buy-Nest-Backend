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
    DoctorScheduleControllers.GetAllFromDB
);

router.get(
    '/my-schedule',
    auth(UserRole.DOCTOR),
    DoctorScheduleControllers.GetMyScheduleDB
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
    DoctorScheduleControllers.DeleteDoctorSchedule
);


export const DoctorScheduleRoutes = router;