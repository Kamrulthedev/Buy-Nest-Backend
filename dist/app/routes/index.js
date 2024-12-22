"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const vendor_route_1 = require("../modules/Vendor/vendor.route");
const shop_route_1 = require("../modules/Shop/shop.route");
const product_route_1 = require("../modules/Product/product.route");
const customer_route_1 = require("../modules/Customer/customer.route");
const cart_route_1 = require("../modules/cart/cart.route");
const cartItem_route_1 = require("../modules/cartItem/cartItem.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRotes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes
    },
    {
        path: "/vendors",
        route: vendor_route_1.VendorsRoutes
    },
    {
        path: "/shops",
        route: shop_route_1.ShopsRoutes
    },
    {
        path: "/products",
        route: product_route_1.PorductsRoutes
    },
    {
        path: "/customer",
        route: customer_route_1.CustomerRoutes
    },
    {
        path: "/carts",
        route: cart_route_1.CartRoutes
    },
    {
        path: "/cart",
        route: cartItem_route_1.CartItemsRoutes
    },
    {
        path: "/order",
        route: order_route_1.OrderRoutes
    }
];
moduleRotes.forEach(route => router.use(route.path, route.route));
exports.default = router;
