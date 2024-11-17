import express from "express";
import { AuthControllar } from "./auth.controllar";

const router = express.Router();

router.post('/login', AuthControllar.loginUserDB);
router.post('/refresh-token', AuthControllar.RefreshTokenDB);

export const AuthRoutes = router;

