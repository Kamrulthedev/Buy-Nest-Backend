import express from "express";
import { AdminControllars } from "./admin.controllar";
import { validateRequest } from "../../middlewares/validateRequest";
import { ValidationWithZod } from "./admin.validation";
import { auth } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();


router.get("/admins", auth(UserRole.ADMIN), AdminControllars.GetAdminsDB);

router.get("/:id", auth(UserRole.ADMIN),  AdminControllars.GetByIdDB);

router.patch("/:id",auth(UserRole.ADMIN),  validateRequest(ValidationWithZod.UpdateValidation), AdminControllars.UpdateAdminDB);

router.delete("/:id",auth(UserRole.ADMIN),  AdminControllars.DeleteFromAdminDB);


export const AdminRoutes = router;
