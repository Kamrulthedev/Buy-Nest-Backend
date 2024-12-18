import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { CartControllars } from "./cart.controllar";


const router = express.Router();


// router.get("/all-products", ProductsControllars.GetAllProductsDB);

// router.get("/:id", ProductsControllars.GetByProductIdDB);


router.post('/create-cart', auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.CreateCartDB);


export const CartRoutes = router;