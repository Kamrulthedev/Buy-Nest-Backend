import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { Fileuploader } from "../../../helpars/fileUploads";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get('/all-users', auth(UserRole.ADMIN), UserControllars.GetAllFormDB);

// router.get('/me', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), UserControllars.GetMyProfileSQ);

router.patch("/update-me", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.UpdateUser.parse(JSON.parse(req.body.data))
        return UserControllars.UpdateMyProfileDB(req, res, next)
    }
);


router.post("/create-admin", auth(UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data))
        return UserControllars.CreateAdminDB(req, res, next)
    },
);


router.post("/create-vendor", auth(UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.CreateVendorValidation.parse(JSON.parse(req.body.data))
        return UserControllars.CreateVendorDB(req, res, next)
    },
);


router.post("/create-customer", Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.CreateCustomer.parse(JSON.parse(req.body.data))
        return UserControllars.CreateCustomerDB(req, res, next)
    });


router.patch('/change-status', auth(UserRole.ADMIN), UserControllars.ChangeUserStatusDB);

export const UserRoutes = router;
