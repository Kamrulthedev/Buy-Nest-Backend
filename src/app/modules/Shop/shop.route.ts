import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ShopsControllars } from "./shop.controlllar";
import { Fileuploader } from "../../../helpars/fileUploads";
import { ShopValidation } from "./shop.validation";

const router = express.Router();


router.get("/all-shops", auth(UserRole.ADMIN), ShopsControllars.GetAllShopsDB);


router.get("/all-shops-create-carts", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), ShopsControllars.GetAllShopsCreateCartsDB);

router.get("/:id", auth(UserRole.ADMIN, UserRole.VENDOR), ShopsControllars.GetByShopIdDB);

router.get("/get-shop-with-vendor/:id", auth(UserRole.ADMIN, UserRole.VENDOR), ShopsControllars.GetBywithVendorShopIdDB);


router.patch("/update-shop/:id", auth(UserRole.ADMIN, UserRole.VENDOR),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = ShopValidation.UpdateShop.parse(JSON.parse(req.body.data))
        return ShopsControllars.UdpateShopDB(req, res, next)
    }
);



export const ShopsRoutes = router;
