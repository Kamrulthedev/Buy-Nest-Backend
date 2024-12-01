import { NextFunction, Request, RequestHandler, Response } from "express";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorsServices } from "./doctor.service";
import { DOctorFilterableFields } from "./doctor.constent";


const GetDoctorsDB = catchAsync(async (req, res) => {
    const filter = pick(req.query, DOctorFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await DoctorsServices.GetDoctors(filter, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "DOctor Data fetched Successfully!",
    meta: result.meta,
    data: result.data,
  });
});


export const DoctorsControllars = {
  GetDoctorsDB,
};
