/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const initialePayment = async (OrderDate: any) => {
  const response = await axios.post(process.env.PAYMENT_URL!, {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: OrderDate.transactionId,
    success_url: `https://buy-nest-backend.vercel.app/api/v1/confirmation?
transactionId=${OrderDate.transactionId}&id=${OrderDate.BookinId}&status=success`,
    fail_url:  `https://buy-nest-backend.vercel.app/api/confirmation?&status=Faild`,
    cancel_url: "https://buy-nest-delta.vercel.app/",
    amount: OrderDate.totalPrice,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: OrderDate.customerName,
    cus_email: OrderDate.customerEmail,
    cus_add1: OrderDate.customerAddress,
    cus_add2: "Cox`s Bazar DOHS",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: OrderDate.customerPhone,
    type: "json",
  });
  
  return response.data;
};


export const verifyPayment = async (tnxId: string) => {
  const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
    params: {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      type: "json",
      request_id: tnxId,
    },
  });
  return response.data;
};