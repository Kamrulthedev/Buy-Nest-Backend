import express from "express";
import { UserControllars } from "./user.controllar";
import { auth } from "../../middlewares/auth";

const router = express.Router();


router.post("/create-admin", auth("ADMIN"), UserControllars.CreateAdminSQ);

export const UserRoutes = router;
