import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { VerifyToken } from "../../../helpars/JwtHelpars";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
        const token = req.headers.authorization
        if(!token){
            throw new Error("You are Not Authorized!")
        }
        const verifiedUser = VerifyToken(token, config.jwt_refresh_token as Secret)
        console.log(verifiedUser)
    }catch(error){
        next(error)
    }
  };
};

router.post("/create-admin", auth("ADMIN", "SUPER_ADMIN"), UserControllars.CreateAdminSQ);

export const UserRoutes = router;
