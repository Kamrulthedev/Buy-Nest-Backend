import express from "express";
import { AuthControllar } from "./auth.controllar";

const router = express.Router();

router.post('/login', AuthControllar.loginUserDB);

export const AuthRoutes = router;

