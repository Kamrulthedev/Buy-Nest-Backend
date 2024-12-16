import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { VendotsControllars } from "./vendor.controllar";

const router = express.Router();

router.get("/all-vendors",  VendotsControllars.GetAllVendorsDB);

// router.get("/:id", DoctorsControllars.GetByIdDoctorsDB);

// router.patch("/update/:id", DoctorsControllars.UpdateDoctorsDB);

// router.delete("/delete/:id",auth(UserRole.ADMIN), DoctorsControllars.DeleteDoctorDB);

// router.delete("/softDelete/:id",auth(UserRole.ADMIN), DoctorsControllars.SoftDeleteDoctorsDB);



export const VendorsRoutes = router;
