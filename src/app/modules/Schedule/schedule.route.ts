import express from 'express';
import { UserRole } from '@prisma/client';
import { auth } from '../../middlewares/auth';
import { ScheduleControllers } from './schedule.controllar';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.DOCTOR),
    ScheduleControllers.GetAllFromDB
);

router.get(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
    ScheduleControllers.GetByIdFromDB
);

router.post(
    '/create',
    // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    ScheduleControllers.InserScheduleIntoDB
);

router.delete(
    '/:id',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    ScheduleControllers.DeleteScheduleDB
);

export const ScheduleRoutes = router;