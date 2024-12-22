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
exports.CartItemControllers = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cartItem_service_1 = require("./cartItem.service");
const CreateCartItemDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cartItem_service_1.CartItemServices.CreateCartItem(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Create Cart Item Successfully!",
        data: result,
    });
}));
const GetUserCartItemDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield cartItem_service_1.CartItemServices.GetUserCartItems(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Cart Items fatched Successfully!",
        data: result,
    });
}));
const DeleteCartItemDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req === null || req === void 0 ? void 0 : req.params;
    const result = yield cartItem_service_1.CartItemServices.DeleteCartItem(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Delete Cart Item Successfully!",
        data: result,
    });
}));
exports.CartItemControllers = {
    CreateCartItemDB,
    GetUserCartItemDB,
    DeleteCartItemDB
};
