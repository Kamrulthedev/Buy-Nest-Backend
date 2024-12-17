"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PorductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../../middlewares/auth");
const product_controllar_1 = require("./product.controllar");
const fileUploads_1 = require("../../../helpars/fileUploads");
const product_validation_1 = require("./product.validation");
const router = express_1.default.Router();
router.get("/all-products", product_controllar_1.ProductsControllars.GetAllProductsDB);
router.get("/:id", product_controllar_1.ProductsControllars.GetByProductIdDB);
router.post('/create-product', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = product_validation_1.ProductValidation.CreateProductValidation.parse(JSON.parse(req.body.data));
    return product_controllar_1.ProductsControllars.CreateProductDB(req, res, next);
});
exports.PorductsRoutes = router;
