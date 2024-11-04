import express  from "express";
import { AdminControllars } from "./admin.controllar";


const router = express.Router();

router.get("/admins", AdminControllars.GetAdminsDB);

export const AdminRoutes = router;