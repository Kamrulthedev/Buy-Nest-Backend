import express from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ShopsControllars } from "./shop.controlllar";

const router = express.Router();


router.get("/all-shops",  ShopsControllars.GetAllShopsDB);

// auth(UserRole.ADMIN),

export const ShopsRoutes = router;
