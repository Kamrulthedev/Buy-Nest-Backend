import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ProductsControllars } from "./product.controllar";
import { Fileuploader } from "../../../helpars/fileUploads";

const router = express.Router();


// router.get("/all-shops", auth(UserRole.ADMIN), ShopsControllars.GetAllShopsDB);

// router.get("/:id", auth(UserRole.ADMIN, UserRole.VENDOR),  ShopsControllars.GetByShopIdDB);


router.post('/create-product', auth(UserRole.ADMIN, UserRole.VENDOR), Fileuploader.upload.single('file'),   (req: Request, res: Response, next: NextFunction) => {
    req.body = UserValidation.CreateCustomer.parse(JSON.parse(req.body.data))
    return ProductsControllars.CreateProductDB(req, res, next)
}); 


export const PorductsRoutes = router;