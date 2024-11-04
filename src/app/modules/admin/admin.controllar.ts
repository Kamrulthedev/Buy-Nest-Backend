import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const pick = (obj: any, keys: any) => {
  console.log(obj, keys);
  const finalObj = {};


  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key]= obj[key]
    }
  }
return finalObj
};



const GetAdminsDB = async (req: Request, res: Response) => {
  try {

    const filter =     pick(req.query, ["name", "email", "searchTram", "contactNumber"]);
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
