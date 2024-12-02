import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { DoctorsControllars } from "./doctor.controllar";

const router = express.Router();

router.get("/doctors", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorsControllars.GetDoctorsDB);

router.get("/:id", DoctorsControllars.GetByIdDoctorsDB);

router.patch("/update/:id", DoctorsControllars.UpdateDoctorsDB);

router.delete("/delete/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), DoctorsControllars.DeleteDoctorDB);

router.delete("/softDelete/:id",auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR), DoctorsControllars.SoftDeleteDoctorsDB);



export const DoctorsRoutes = router;
