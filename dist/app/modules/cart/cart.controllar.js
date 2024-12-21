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
exports.CartControllars = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cart_service_1 = require("./cart.service");
const CreateCartDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.CartssServices.CreateCart(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Create Cart Successfully!",
        data: result,
    });
}));
const DelteCartDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cart_service_1.CartssServices.DeleteCart(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Delete Cart Successfully!",
        data: result,
    });
}));
const AllCartsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_service_1.CartssServices.AllCartsGet();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "All Carts Get Successfully!",
        data: result,
    });
}));
const UserCartsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield cart_service_1.CartssServices.USerCartsGet(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "USer Carts Get Successfully!",
        data: result,
    });
}));
exports.CartControllars = {
    CreateCartDB,
    DelteCartDB,
    AllCartsDB,
    UserCartsDB
};
