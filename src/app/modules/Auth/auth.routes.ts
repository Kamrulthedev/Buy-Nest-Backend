import express from "express";
import { AuthControllar } from "./auth.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post('/login', AuthControllar.loginUserDB);
router.post('/refresh-token', AuthControllar.RefreshTokenDB);
router.post('/change-password', auth(UserRole.SUPER_ADMIN,UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),AuthControllar.ChangePaswordDB);

export const AuthRoutes = router; 

