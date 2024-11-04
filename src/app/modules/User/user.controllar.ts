import { Request, Response } from "express";
import { UserServices } from "./user.service";

const CreateAdminSQ = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserServices.CreateAdmin(data);
  res.send(result);
};

export const UserControllars = {
  CreateAdminSQ,
};
