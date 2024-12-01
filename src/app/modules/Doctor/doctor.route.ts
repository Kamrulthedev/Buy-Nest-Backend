import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorsControllars } from "./doctor.controllar";

const router = express.Router();

router.get("/doctors", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorsControllars.GetDoctorsDB);

router.get("/:id", DoctorsControllars.GetByIdDoctorsDB);


export const DoctorsRoutes = router;
