import express from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ShopsControllars } from "./shop.controlllar";

const router = express.Router();


router.get("/all-shops", auth(UserRole.ADMIN), ShopsControllars.GetAllShopsDB);


router.get("/all-shops-create-carts", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), ShopsControllars.GetAllShopsCreateCartsDB);


router.get("/:id", auth(UserRole.ADMIN, UserRole.VENDOR),  ShopsControllars.GetByShopIdDB);


router.get("/get-shop-with-vendor/:id", auth(UserRole.ADMIN, UserRole.VENDOR),  ShopsControllars.GetBywithVendorShopIdDB);


export const ShopsRoutes = router;
