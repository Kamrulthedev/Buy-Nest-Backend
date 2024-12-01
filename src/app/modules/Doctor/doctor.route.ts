import express from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorsControllars } from "./doctor.controllar";

const router = express.Router();


router.get("/doctors", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorsControllars.GetDoctorsDB);


export const DoctorsRoutes = router;
