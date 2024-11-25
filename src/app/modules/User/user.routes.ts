import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { Fileuploader } from "../../../helpars/fileUploads";
import { UserValidation } from "./user.validation";

const router = express.Router();


router.post("/create-admin", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = UserValidation.createAdmin.parse(JSON.parse(req.body.data))
        return UserControllars.CreateAdminSQ(req, res, next)
    },
);

export const UserRoutes = router;
