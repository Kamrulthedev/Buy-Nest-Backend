import express, { NextFunction, Request, Response } from "express";
import { AdminControllars } from "./admin.controllar";

const router = express.Router();

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("data", req.body);
  console.log("Checker Middleware.....");
  next();
};

router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/:id", AdminControllars.GetByIdDB);

router.patch("/:id", validateRequest, AdminControllars.UpdateAdminDB);

router.delete("/:id", AdminControllars.DeleteFromAdminDB);

router.delete("/soft/:id", AdminControllars.SoftDeleteFromAdminDB);

export const AdminRoutes = router;
