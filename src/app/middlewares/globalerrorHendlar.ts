import { NextFunction, Request, Response } from "express";




export const globalErrorHendlar = (err : any, req: Request, res: Response , next : NextFunction) =>{
    res.status(200).json({
      success : false,
      message : err.message || "Someting Went Wrong!",
      error : err
    })
};