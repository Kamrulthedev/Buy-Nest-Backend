import express from "express";
import { UserControllars } from "./user.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import upload from "../../../helpars/fileUploads";

const router = express.Router();


router.post("/create-admin", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    upload.single('file'),
    UserControllars.CreateAdminSQ);

export const UserRoutes = router;
