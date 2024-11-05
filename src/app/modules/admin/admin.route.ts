import express  from "express";
import { AdminControllars } from "./admin.controllar";


const router = express.Router();

router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/admin/:id", AdminControllars.GetByIdDB);

export const AdminRoutes = router;