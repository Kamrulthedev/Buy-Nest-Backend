import { Request, Response } from "express";
import { UserServices } from "./user.service";

const CreateAdminSQ = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await UserServices.CreateAdmin(data);
    res.status(200).json({
      success: true,
      message: "Admin Created Successfully!",
      data: result,
    });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.name || "Something Went Wrong",
      err: error,
    });
  }
  
};

export const UserControllars = {
  CreateAdminSQ,
};
