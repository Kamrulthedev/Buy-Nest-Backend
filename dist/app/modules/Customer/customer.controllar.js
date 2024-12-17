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
exports.CustomerControllers = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const customer_constent_1 = require("./customer.constent");
const customer_service_1 = require("./customer.service");
const GetAllCustomerDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, customer_constent_1.CustomerSearchableFields);
    const options = (0, pick_1.pick)(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = yield customer_service_1.CustomerServices.GetAllCustomer(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Customer retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const GetByIdCustomerDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield customer_service_1.CustomerServices.GetByIdFrom(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Patient retrieval successfully',
        data: result,
    });
}));
// const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.UpdateInto(id, req.body);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient updated successfully',
//     data: result,
//   });
// });
// const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.DeleteFrom(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient deleted successfully',
//     data: result,
//   });
// });
// const SoftDeleteDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.SoftDelete(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient soft deleted successfully',
//     data: result,
//   });
// });
exports.CustomerControllers = {
    GetAllCustomerDB,
    GetByIdCustomerDB
};
