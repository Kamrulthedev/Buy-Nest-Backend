"use strict";
// import { NextFunction, Request, RequestHandler, Response } from "express";
// import { pick } from "../../../shared/pick";
// import sendResponse from "../../../shared/sendResponse";
// import { catchAsync } from "../../../shared/catchAsync";
// import { DoctorsServices } from "./doctor.service";
// import { DOctorFilterableFields } from "./doctor.constent";
// const GetDoctorsDB = catchAsync(async (req, res) => {
//     const filter = pick(req.query, DOctorFilterableFields);
//     console.log("filters: " , filter);
//     const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
//     const result = await DoctorsServices.GetDoctors(filter, options);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Doctor Data fetched Successfully!",
//         meta: result.meta,
//         data: result.data,
//     });
// });
// const GetByIdDoctorsDB = catchAsync(async (req, res) => {
//     const {id} = req.params;
//     const result = await DoctorsServices.GetByIdDoctors(id);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "Doctor Data fetched Successfully!",
//         data: result,
//     });
// });
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
// export const DoctorsControllars = {
//     GetDoctorsDB,
//     GetByIdDoctorsDB,
//     UpdateDoctorsDB,
//     DeleteDoctorDB,
//     SoftDeleteDoctorsDB
// };
