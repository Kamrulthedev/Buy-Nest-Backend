"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orderItem_controllar_1 = require("./orderItem.controllar");
const order_validation_1 = require("./order.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
// router.get("/all-carts", CartControllars.AllCartsDB);
// // router.get("/:id", ProductsControllars.GetByProductIdDB);
router.get("/user-cart-items/:id", orderItem_controllar_1.OrderItemControllers.GetUserOrdersItemDB);
// router.delete("/delete-cart/:id", auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER), CartControllars.DelteCartDB);
// auth(UserRole.ADMIN, UserRole.VENDOR, UserRole.CUSTOMER)
router.post('/create-order-item', (0, validateRequest_1.validateRequest)(order_validation_1.OrderValidation.CreateOrderValidation), orderItem_controllar_1.OrderItemControllers.CreateOrderItemDB);
exports.OrderItemRoutes = router;
