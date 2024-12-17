"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const customer_controllar_1 = require("./customer.controllar");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get('/all-customer', (0, auth_1.auth)(client_1.UserRole.ADMIN), customer_controllar_1.CustomerControllers.GetAllCustomerDB);
router.get('/:id', customer_controllar_1.CustomerControllers.GetByIdCustomerDB);
exports.CustomerRoutes = router;
