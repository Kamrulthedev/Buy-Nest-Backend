import express from "express";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { VendorsControllars } from "./vendor.controllar";


const router = express.Router();

router.get("/all-vendors", auth(UserRole.ADMIN), VendorsControllars.GetAllVendorsDB);

router.get("/:id", auth(UserRole.ADMIN, UserRole.VENDOR), VendorsControllars.GetByIdVendorsDB);

// router.patch("/update/:id", DoctorsControllars.UpdateDoctorsDB);

// router.delete("/delete/:id",auth(UserRole.ADMIN), DoctorsControllars.DeleteDoctorDB);

// router.delete("/softDelete/:id",auth(UserRole.ADMIN), DoctorsControllars.SoftDeleteDoctorsDB);



export const VendorsRoutes = router;
