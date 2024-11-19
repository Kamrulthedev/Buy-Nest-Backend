import express, { NextFunction, Request, Response } from "express";
import { AdminControllars } from "./admin.controllar";
import { validateRequest } from "../../middlewares/validateRequest";
import { ValidationWithZod } from "./admin.validation";

const router = express.Router();



router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/:id", AdminControllars.GetByIdDB);

router.patch("/:id", validateRequest(ValidationWithZod.UpdateValidation), AdminControllars.UpdateAdminDB);

router.delete("/:id", AdminControllars.DeleteFromAdminDB);

router.delete("/soft/:id", AdminControllars.SoftDeleteFromAdminDB);

export const AdminRoutes = router;
