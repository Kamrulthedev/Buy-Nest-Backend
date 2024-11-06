import express  from "express";
import { AdminControllars } from "./admin.controllar";


const router = express.Router();

router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/admin/:id", AdminControllars.GetByIdDB);

router.patch("/admin/:id", AdminControllars.UpdateAdminDB);

router.delete("/admin/:id", AdminControllars.DeleteFromAdminDB);

router.

export const AdminRoutes = router;