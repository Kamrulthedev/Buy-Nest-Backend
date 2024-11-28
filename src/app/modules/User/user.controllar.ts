import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";

const CreateAdminSQ = catchAsync(async (req, res) => {
  const result = await UserServices.CreateAdmin(req);
  res.status(200).json({
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});


const CreateDoctorSQ = catchAsync(async (req, res) => {
  const result = await UserServices.CreateDoctor(req);
  res.status(200).json({
    success: true,
    message: "Doctor Created Successfully!",
    data: result,
  });
});


const CreatePatientSQ = catchAsync(async (req, res) => {
  const result = await UserServices.CreatePatient(req)
  res.status(200).json({
    success: true,
    message: "Patient Created Usccessfully!",
    data: result
  })
});

export const UserControllars = {
  CreateAdminSQ,
  CreateDoctorSQ,
  CreatePatientSQ
};
