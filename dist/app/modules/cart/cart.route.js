"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoutes = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const auth_1 = require("../../middlewares/auth");
const cart_controllar_1 = require("./cart.controllar");
const router = express_1.default.Router();
router.get("/all-carts", cart_controllar_1.CartControllars.AllCartsDB);
// router.get("/:id", ProductsControllars.GetByProductIdDB);
router.delete("/delete-cart/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), cart_controllar_1.CartControllars.DelteCartDB);
router.post('/create-cart', (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), cart_controllar_1.CartControllars.CreateCartDB);
exports.CartRoutes = router;
