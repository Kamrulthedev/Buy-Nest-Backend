import { NextFunction, Request, RequestHandler, Response } from "express";
import { AdminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { AdminFilterableFields } from "./admin.constent";
import sendResponse from "../../../shared/sendResponse";
import { catchAsync } from "../../../shared/catchAsync";


const GetAdminsDB = catchAsync(async (req, res) => {
  const filter = pick(req.query, AdminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminServices.GetAdmins(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Data fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const GetByIdDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.GetById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Data Fatched Successfully!",
    data: result,
  });
});

const UpdateAdminDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.UpdateAdmin(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Data Updaetd!",
    data: result,
  });
});

const DeleteFromAdminDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.DeleteFromAdmin(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Data Deleted!",
    data: result,
  });
});

//soft Delete
const SoftDeleteFromAdminDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.SoftDeleteFromAdmin(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin Data Deleted Successfully!",
    data: result,
  });
});

export const AdminControllars = {
  GetAdminsDB,
  GetByIdDB,
  UpdateAdminDB,
  DeleteFromAdminDB,
  SoftDeleteFromAdminDB,
};
