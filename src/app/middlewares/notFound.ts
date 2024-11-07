import { NextFunction, Request, Response } from "express"

export const notFount = (req : Request, res : Response, next: NextFunction)=>{
    console.log(req)
  res.status(500).json({
    success : false,
    message : "API NOT FOUND!",
    error : {
        path : req.originalUrl,
        error : "Your Requested Path Not Found"
    }
  })
};