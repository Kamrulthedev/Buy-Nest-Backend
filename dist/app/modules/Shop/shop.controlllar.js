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
exports.ShopsControllars = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const shop_constent_1 = require("./shop.constent");
const shop_service_1 = require("./shop.service");
const GetAllShopsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.pick)(req.query, shop_constent_1.ShopFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield shop_service_1.ShopServices.GetAllShops(filter, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop Data fetched Successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const GetByShopIdDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield shop_service_1.ShopServices.GetByShopId(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Shop Data Fatched Successfully!",
        data: result,
    });
}));
exports.ShopsControllars = {
    GetAllShopsDB,
    GetByShopIdDB
};
