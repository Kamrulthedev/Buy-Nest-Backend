"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = require("express");
const payment_controllar_1 = require("./payment.controllar");
const router = (0, express_1.Router)();
// Route to create an order
router.post('/initiale', payment_controllar_1.PaymentControllars.initialeDB);
router.post('/confirmation', payment_controllar_1.PaymentControllars.confirmantionDB);
exports.PaymentRoutes = router;
