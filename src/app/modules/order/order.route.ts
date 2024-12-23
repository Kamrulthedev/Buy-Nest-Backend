import express from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { OrderControllers } from "./order.controllar";


const router = express.Router();


// router.get("/all-carts", CartControllars.AllCartsDB);

// // router.get("/:id", ProductsControllars.GetByProductIdDB);

router.get("/user-cart-items/:id",  );

// router.delete("/delete-cart/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.DelteCartDB);
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER)

router.post('/create-order', OrderControllers.CreateOrderDB);


export const OrderRoutes = router;