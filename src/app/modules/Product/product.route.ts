import express from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ProductsControllars } from "./product.controllar";

const router = express.Router();


// router.get("/all-shops", auth(UserRole.ADMIN), ShopsControllars.GetAllShopsDB);

// router.get("/:id", auth(UserRole.ADMIN, UserRole.VENDOR),  ShopsControllars.GetByShopIdDB);


router.post('/create-product', auth(UserRole.ADMIN, UserRole.VENDOR), ProductsControllars.CreateProductDB)


export const PorductsRoutes = router;