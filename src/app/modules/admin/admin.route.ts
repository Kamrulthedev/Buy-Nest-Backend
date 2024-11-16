import express, { NextFunction, Request, Response } from "express";
import { AdminControllars } from "./admin.controllar";
import { AnyZodObject, z } from "zod";

const router = express.Router();

const updated = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body : req.body
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};

router.get("/admins", AdminControllars.GetAdminsDB);

router.get("/:id", AdminControllars.GetByIdDB);

router.patch("/:id", validateRequest(updated), AdminControllars.UpdateAdminDB);

router.delete("/:id", AdminControllars.DeleteFromAdminDB);

router.delete("/soft/:id", AdminControllars.SoftDeleteFromAdminDB);

export const AdminRoutes = router;
