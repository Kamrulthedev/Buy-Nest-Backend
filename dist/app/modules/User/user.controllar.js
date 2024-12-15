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
exports.UserControllars = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_constant_1 = require("./user.constant");
const CreateAdminDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.CreateAdmin(req);
    res.status(200).json({
        success: true,
        message: "Admin Created Successfully!",
        data: result,
    });
}));
const CreateVendorDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.CreateVendor(req);
    res.status(200).json({
        success: true,
        message: "Vendor Created Successfully!",
        data: result,
    });
}));
const CreateCustomerDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.CreateCustomer(req);
    res.status(200).json({
        success: true,
        message: "Customer Created Successfully!",
        data: result
    });
}));
const GetAllFormDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.pick)(req.query, user_constant_1.UserFilterableFields);
    const options = (0, pick_1.pick)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield user_service_1.UserServices.GetAllForm(filter, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Data fetched Successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const ChangeUserStatusDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.ChangeUserStatus(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Status Updated Successfully!",
        data: result
    });
}));
// const GetMyProfileSQ = catchAsync(async (req, res) => {
//   const { user } = req;
//   const result = await UserServices.GetMyProfile(user);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "My Profile Data",
//     data: result
//   })
// });
const UpdateMyProfileDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    const { body } = req;
    const { file } = req;
    const result = yield user_service_1.UserServices.UpdateMyProfile(user, body, file);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Update Profile Successfully",
        data: result
    });
}));
const DeleteUserDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.DeleteUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Deleted Successfully!",
        data: result
    });
}));
exports.UserControllars = {
    CreateAdminDB,
    CreateVendorDB,
    CreateCustomerDB,
    GetAllFormDB,
    ChangeUserStatusDB,
    // GetMyProfileSQ,
    UpdateMyProfileDB,
    DeleteUserDB
};
