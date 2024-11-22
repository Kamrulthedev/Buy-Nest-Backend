import express, { NextFunction, Request, Response } from "express";
import { AdminControllars } from "./admin.controllar";
import { validateRequest } from "../../middlewares/validateRequest";
import { ValidationWithZod } from "./admin.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();


router.get("/admins", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN), AdminControllars.GetAdminsDB);

router.get("/:id", auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),  AdminControllars.GetByIdDB);

router.patch("/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),  validateRequest(ValidationWithZod.UpdateValidation), AdminControllars.UpdateAdminDB);

router.delete("/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),  AdminControllars.DeleteFromAdminDB);

router.delete("/soft/:id",auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),  AdminControllars.SoftDeleteFromAdminDB);

export const AdminRoutes = router;
