import express  from "express";
import { AdminControllars } from "./admin.controllar";


const router = express.Router();

router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/:id", AdminControllars.GetByIdDB);

router.patch("/:id", AdminControllars.UpdateAdminDB);

router.delete("/:id", AdminControllars.DeleteFromAdminDB);

router.delete("/soft/:id", AdminControllars.SoftDeleteFromAdminDB);

export const AdminRoutes = router;