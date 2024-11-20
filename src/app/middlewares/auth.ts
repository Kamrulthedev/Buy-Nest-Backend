import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../../helpars/JwtHelpars";
import config from "../config";
import { Secret } from "jsonwebtoken";





export const auth = (...roles: string[]) => {
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