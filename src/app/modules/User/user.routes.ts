import express, { NextFunction, Request, Response } from "express";
import { UserControllars } from "./user.controllar";
import { VerifyToken } from "../../../helpars/JwtHelpars";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const router = express.Router();

// const auth = (...roles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req.headers)
//     // try{
//     //     const token = req.headers.authorization
//     //     console.log(token)
//     //     if(!token){
//     //         throw new Error("You are Not Authorized!")
//     //     }
//     //     // const verifiedUser = VerifyToken(token, config.jwt_refresh_token as Secret)
//     //     // console.log(verifiedUser)
//     // }catch(error){
//     //     next(error)
//     // }
//   };
// };

router.post("/create-admin", UserControllars.CreateAdminSQ);

export const UserRoutes = router;
