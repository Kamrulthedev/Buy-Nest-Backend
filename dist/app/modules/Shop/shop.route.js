"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../../middlewares/auth");
const shop_controlllar_1 = require("./shop.controlllar");
const fileUploads_1 = require("../../../helpars/fileUploads");
const shop_validation_1 = require("./shop.validation");
const router = express_1.default.Router();
router.get("/all-shops", (0, auth_1.auth)(client_1.UserRole.ADMIN), shop_controlllar_1.ShopsControllars.GetAllShopsDB);
router.get("/all-shops-create-carts", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), shop_controlllar_1.ShopsControllars.GetAllShopsCreateCartsDB);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), shop_controlllar_1.ShopsControllars.GetByShopIdDB);
router.get("/get-shop-with-vendor/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), shop_controlllar_1.ShopsControllars.GetBywithVendorShopIdDB);
router.patch("/update-shop/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = shop_validation_1.ShopValidation.UpdateShop.parse(JSON.parse(req.body.data));
    return shop_controlllar_1.ShopsControllars.UdpateShopDB(req, res, next);
});
exports.ShopsRoutes = router;
