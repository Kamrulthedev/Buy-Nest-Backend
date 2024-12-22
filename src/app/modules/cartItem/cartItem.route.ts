import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { CartItemControllers } from "./cartItem.controllar";


const router = express.Router();


// router.get("/all-carts", CartControllars.AllCartsDB);

// // router.get("/:id", ProductsControllars.GetByProductIdDB);

router.get("/user-cart-items/:id",  CartItemControllers.GetUserCartItemDB);


router.delete("/delete-cart-item/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartItemControllers.DeleteCartItemDB);



router.post('/create-cart-item', auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartItemControllers.CreateCartItemDB);


export const CartItemsRoutes = router;