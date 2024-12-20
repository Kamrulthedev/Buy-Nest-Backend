import express, { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { auth } from "../../middlewares/auth";
import { ProductsControllars } from "./product.controllar";
import { Fileuploader } from "../../../helpars/fileUploads";
import { ProductValidation } from "./product.validation";

const router = express.Router();


router.get("/all-products", ProductsControllars.GetAllProductsDB);

router.get('/all-products-with-vendor/:id', ProductsControllars.GetAllProductsWithVendorDB)

router.get("/:id", ProductsControllars.GetByProductIdDB);


router.delete("/delete-product/:id", auth(UserRole.ADMIN, UserRole.VENDOR), ProductsControllars.DeleteProductIdDB);


router.post('/create-product', auth(UserRole.ADMIN, UserRole.VENDOR),
    Fileuploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = ProductValidation.CreateProductValidation.parse(JSON.parse(req.body.data))
        return ProductsControllars.CreateProductDB(req, res, next)
    });


router.patch('/update-product/:id',
    (req: Request, res: Response, next: NextFunction) => {
        req.body.data = JSON.parse(req.body.data);    
        return ProductsControllars.UpdateProductIdDB(req, res, next)
    });


export const PorductsRoutes = router;