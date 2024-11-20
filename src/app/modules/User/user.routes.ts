import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { VerifyToken } from "../../../helpars/JwtHelpars";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new Error("You are Not Authorized!");
        }
  
        const verifiedUser = VerifyToken(token, config.jwt_access_token as Secret);
        
        if (typeof verifiedUser !== "object" || verifiedUser === null || !("role" in verifiedUser)) {
          throw new Error("You are Not Authorized!");
        }
  
        if (roles.length && !roles.includes(verifiedUser.role)) {
          throw new Error("You are Not Authorized!");
        }
  
        next();
      } catch (error) {
        next(error);
      }
    };
  };
  


router.post("/create-admin", auth("ADMIN"), UserControllars.CreateAdminSQ);

export const UserRoutes = router;
