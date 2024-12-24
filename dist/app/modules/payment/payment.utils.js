"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initialePayment = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initialePayment = (OrderDate) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.post(process.env.PAYMENT_URL, {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        tran_id: OrderDate.transactionId,
        success_url: `https://buy-nest-backend.vercel.app/api/v1/confirmation?
transactionId=${OrderDate.transactionId}&id=${OrderDate.BookinId}&status=success`,
        fail_url: `https://buy-nest-backend.vercel.app/api/confirmation?&status=Faild`,
        cancel_url: "https://buy-nest-delta.vercel.app/",
        amount: OrderDate.totalPrice,
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: OrderDate.customerName,
        cus_email: OrderDate.customerEmail,
        cus_add1: OrderDate.customerAddress,
        cus_add2: "Cox`s Bazar DOHS",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1206",
        cus_country: "Bangladesh",
        cus_phone: OrderDate.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initialePayment = initialePayment;
const verifyPayment = (tnxId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(process.env.PAYMENT_VERIFY_URL, {
        params: {
            store_id: process.env.STORE_ID,
            signature_key: process.env.SIGNATURE_KEY,
            type: "json",
            request_id: tnxId,
        },
    });
    return response.data;
});
exports.verifyPayment = verifyPayment;
