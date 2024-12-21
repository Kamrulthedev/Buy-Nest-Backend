import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { CartItemControllers } from "./cartItem.controllar";


const router = express.Router();


// router.get("/all-carts", CartControllars.AllCartsDB);

// // router.get("/:id", ProductsControllars.GetByProductIdDB);

// router.get("/user-carts/:id",  CartControllars.UserCartsDB);

// router.delete("/delete-cart/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.DelteCartDB);
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER)

router.post('/create-cart-item', CartItemControllers.CreateCartItemDB);


export const CartItemsRoutes = router;