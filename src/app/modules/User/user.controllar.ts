import { Request, Response } from "express";
import { UserServices } from "./user.service";

const CreateAdminSQ = async (req: Request, res: Response) => {
    console.log(req.body)
  const result = await UserServices.CreateAdmin();
  res.send(result);
};

export const UserControllars = {
  CreateAdminSQ,
};
