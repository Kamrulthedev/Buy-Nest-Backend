import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const GetAdminsDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.GetAdmins(req.query);
    res.status(200).json({
      success: true,
      message: "Admins Fatched!",
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

export const AdminControllars = {
  GetAdminsDB,
};
