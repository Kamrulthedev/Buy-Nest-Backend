import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { Fileuploader } from "../../../helpars/fileUploads";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get('/', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), UserControllars.GetAllFormSQ);

router.get('/me', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), UserControllars.GetMyProfileSQ);

router.patch("/update-me", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        return UserControllars.UpdateMyProfileSQ(req, res, next)
    });

router.post("/create-admin", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data))
        return UserControllars.CreateAdminSQ(req, res, next)
    },
);


router.post("/create-doctor", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.CreateDoctorValidation.parse(JSON.parse(req.body.data))
        return UserControllars.CreateDoctorSQ(req, res, next)
    },
);


router.post("/create-patient", Fileuploader.upload.single('file'), (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.CreatePatient.parse(JSON.parse(req.body.data))
    return UserControllars.CreatePatientSQ(req, res, next)
});


router.patch('/:id/status', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), UserControllars.ChangeProfileStatusSQ);

export const UserRoutes = router;
