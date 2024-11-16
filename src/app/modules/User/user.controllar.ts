import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";

const CreateAdminSQ = catchAsync(async (req, res) => {
  const data = req.body;
    const result = await UserServices.CreateAdmin(data);
    res.status(200).json({
      success: true,
      message: "Admin Created Successfully!",
      data: result,
    });
});

export const UserControllars = {
  CreateAdminSQ,
};
