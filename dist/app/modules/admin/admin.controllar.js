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
exports.AdminControllars = void 0;
const admin_service_1 = require("./admin.service");
const pick_1 = require("../../../shared/pick");
const admin_constent_1 = require("./admin.constent");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = require("../../../shared/catchAsync");
const GetAdminsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.pick)(req.query, admin_constent_1.AdminFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield admin_service_1.AdminServices.GetAdmins(filter, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin Data fetched Successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const GetByIdDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.GetById(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin Data Fatched Successfully!",
        data: result,
    });
}));
const UpdateAdminDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.UpdateAdmin(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin Data Updaetd!",
        data: result,
    });
}));
const DeleteFromAdminDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.DeleteFromAdmin(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Admin Data Deleted!",
        data: result,
    });
}));
exports.AdminControllars = {
    GetAdminsDB,
    GetByIdDB,
    UpdateAdminDB,
    DeleteFromAdminDB,
};
