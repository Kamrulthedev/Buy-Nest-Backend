"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../../middlewares/auth");
const cartItem_controllar_1 = require("./cartItem.controllar");
const router = express_1.default.Router();
// router.get("/all-carts", CartControllars.AllCartsDB);
// // router.get("/:id", ProductsControllars.GetByProductIdDB);
router.get("/user-cart-items/:id", cartItem_controllar_1.CartItemControllers.GetUserCartItemDB);
router.delete("/delete-cart-item/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), cartItem_controllar_1.CartItemControllers.DeleteCartItemDB);
router.post('/create-cart-item', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), cartItem_controllar_1.CartItemControllers.CreateCartItemDB);
exports.CartItemsRoutes = router;
