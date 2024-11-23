import { NextFunction, Request, Response } from "express";
import { VerifyToken } from "../../helpars/JwtHelpars";
import config from "../config";
import { Secret } from "jsonwebtoken";
import AppError from "../errors/AppError";


export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
      try {
          const token = req.headers.authorization;

          if (!token) {
              throw new AppError(401, "You are Not Authorized!");
          }

          const verifiedUser = VerifyToken(token, config.jwt_access_token as Secret);

          if (typeof verifiedUser !== "object" || verifiedUser === null || !("role" in verifiedUser)) {
              throw new AppError(401, "You are Not Authorized!");
          }

          req.user = verifiedUser;

          if (roles.length && !roles.includes(verifiedUser.role)) {
              throw new AppError(401, "You are Not Authorized!");
          }

          next();
      } catch (error) {
          next(error);
      }
  };
}