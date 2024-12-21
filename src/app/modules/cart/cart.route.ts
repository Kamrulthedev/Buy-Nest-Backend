import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { CartControllars } from "./cart.controllar";


const router = express.Router();


router.get("/all-carts", CartControllars.AllCartsDB);

// router.get("/:id", ProductsControllars.GetByProductIdDB);

router.delete("/delete-cart/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.DelteCartDB);

router.post('/create-cart', auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.CreateCartDB);


export const CartRoutes = router;