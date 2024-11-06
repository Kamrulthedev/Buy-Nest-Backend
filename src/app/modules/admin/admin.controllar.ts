import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { AdminFilterableFields } from "./admin.constent";


const sendResponse = <T>(res : Response, jsonData : {
  statusCode : number,
  success : boolean,
  message : string,
  meta? : {
    page : number,
    limit : number,
    total : number
  },
  data : T | null | undefined
}) =>{
  res.status(jsonData.statusCode).json({
    success : jsonData.success,
    message : jsonData.message,
    meta : jsonData.meta || null || undefined,
    data : jsonData.data || null || undefined
  })
}


const GetAdminsDB = async (req: Request, res: Response) => {
  try {
    const filter = pick(req.query, AdminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminServices.GetAdmins(filter, options);
    sendResponse(res, {
      statusCode : 200,
      success : true,
      message : "Admin Data fetched Successfully!",
      meta : result.meta,
      data : result.data
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

const GetByIdDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.GetById(id);
      sendResponse(res, {
        statusCode : 200,
        success: true,
        message: "Admin Data Fatched Successfully!",
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

const UpdateAdminDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await AdminServices.UpdateAdmin(id, req.body);
   sendResponse(res, {
    statusCode : 200,
    success: true,
    message: "Admin Data Updaetd!",
    data: result,
   });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.name || "Somting Went Wrong!",
      err: error,
    });
  }
};


const DeleteFromAdminDB = async(req: Request, res: Response) =>{
  const { id } = req.params;
  try {
    const result = await AdminServices.DeleteFromAdmin(id);
  sendResponse (res, {
    statusCode : 200,
    success: true,
    message: "Admin Data Deleted!",
    data: result,
  });
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.name || "Somting Went Wrong!",
      err: error,
    });
  }
}

//soft Delete
const SoftDeleteFromAdminDB = async(req: Request, res: Response) =>{
  const { id } = req.params;
  try {
    const result = await AdminServices.SoftDeleteFromAdmin(id);
  sendResponse(res, {
    statusCode : 200,
    success: true,
    message: "Admin Data Deleted Successfully!",
    data: result,
  })
  } catch (err: unknown) {
    const error = err as Error;
    res.status(500).json({
      success: false,
      message: error?.name || "Somting Went Wrong!",
      err: error,
    });
  }
};

export const AdminControllars = {
  GetAdminsDB,
  GetByIdDB,
  UpdateAdminDB,
  DeleteFromAdminDB,
  SoftDeleteFromAdminDB
};
