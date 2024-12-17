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
exports.VendorsControllars = void 0;
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = require("../../../shared/catchAsync");
const vendor_constent_1 = require("./vendor.constent");
const vendor_service_1 = require("./vendor.service");
const GetAllVendorsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.pick)(req.query, vendor_constent_1.VendorsSearchAvleFields);
    console.log("filters: ", filter);
    const options = (0, pick_1.pick)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield vendor_service_1.VendorsServices.GetAllVendors(filter, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendors Data fetched Successfully!",
        meta: result.meta,
        data: result.data,
    });
}));
const GetByIdVendorsDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield vendor_service_1.VendorsServices.GetByIdVendor(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Vendor Data fetched Successfully!",
        data: result,
    });
}));
// const UpdateDoctorsDB = catchAsync(async (req, res) => {
//     const {id} = req.params;
//      const data = req.body;
//     const result = await DoctorsServices.UpdateDoctor(id, data);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Doctor Data Update Successfully!",
//         data: result,
//     });
// });
// const DeleteDoctorDB = catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const result = await DoctorsServices.DeleteFromDoctor(id);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Doctor Data Deleted Successfully!",
//         data: null,
//     });
// });
// const SoftDeleteDoctorsDB = catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const result = await DoctorsServices.SoftDeleteFromDoctor(id);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Doctor Data Soft Delete Successfully!",
//         data: result,
//     });
// });
exports.VendorsControllars = {
    GetAllVendorsDB,
    GetByIdVendorsDB,
    // UpdateDoctorsDB,
    // DeleteDoctorDB,
    // SoftDeleteDoctorsDB
};
