import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { AdminFilterableFields } from "./admin.constent";



const GetAdminsDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, AdminFilterableFields);
    const result = await AdminServices.GetAdmins(filter);
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
