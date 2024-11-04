import { Request, Response } from "express";
import { AdminServices } from "./admin.service";


const GetAdminsDB = async(req : Request, res : Response) => {
    const result = await AdminServices.GetAdmins(req.query);
    res.status(200).json({
        success: true,
        message : "Admins Fatched!",
        data : result
    })
};

export const AdminControllars = {
    GetAdminsDB
}