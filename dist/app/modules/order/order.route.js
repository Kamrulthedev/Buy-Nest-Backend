"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controllar_1 = require("./order.controllar");
const router = express_1.default.Router();
// router.get("/all-carts", CartControllars.AllCartsDB);
// // router.get("/:id", ProductsControllars.GetByProductIdDB);
// router.get("/user-cart-items/:id",  CartItemControllers.GetUserCartItemDB);
// router.delete("/delete-cart/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.DelteCartDB);
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER)
router.post('/create-order', order_controllar_1.OrderControllers.CreateOrderDB);
exports.OrderRoutes = router;
