import express from "express";
import { AuthControllar } from "./auth.controllar";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post('/login', AuthControllar.loginUserDB);
router.post('/refresh-token', AuthControllar.RefreshTokenDB);
router.post('/change-password', auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER),AuthControllar.ChangePaswordDB);
router.post('/forget-password', AuthControllar.ForgetPasswordDB);
router.post('/reset-password', AuthControllar.ResetPasswordDB);

export const AuthRoutes = router; 

