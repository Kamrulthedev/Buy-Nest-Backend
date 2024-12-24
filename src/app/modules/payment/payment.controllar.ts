import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";

const initialeDB = async (req: Request, res: Response) => {
  const result = await PaymentServices.initiale(req.body);
  res.send(result);
};



const confirmantionDB = async (req: Request, res: Response) => {
  const { transactionId, id } = req.query;
  const result = await PaymentServices.confirmantion(
    transactionId as string,
    id as string
  );
  res.send(result);
};


export const PaymentControllars = {
  initialeDB,
  confirmantionDB,
};





