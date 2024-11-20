"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const admin_route_1 = require("../modules/admin/admin.route");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const router = express_1.default.Router();
const moduleRotes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes
    }
];
moduleRotes.forEach(route => router.use(route.path, route.route));
exports.default = router;
