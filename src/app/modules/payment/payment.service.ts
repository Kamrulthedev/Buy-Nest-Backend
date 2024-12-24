/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../shared/SharedPrisma";
import { initialePayment, verifyPayment } from "./payment.utils";

const initiale = async (BookingInitaleData: any) => {
    const transactionId = `TXN-${Date.now()}`;
    const OrderDate = {
        transactionId,
        customerName: BookingInitaleData?.userName,
        customerEmail: BookingInitaleData?.userEmail,
        totalPrice: BookingInitaleData?.totalePrice,
        customerPhone: BookingInitaleData?.phone,
        customerAddress: BookingInitaleData?.address,
        BookinId: BookingInitaleData?.BookingId,
    };

    const paymentSession = await initialePayment(OrderDate);
    return paymentSession;
};



const confirmantion = async (transactionId: string, id: string): Promise<string> => {
    const verifyResponse = await verifyPayment(transactionId);
    let message = "";

    if (verifyResponse && verifyResponse.pay_status === "Successful") {

        await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: "COMPLETED"
            }
        });

        message = "Successfully Payment!";
    } else {
        message = "Failed Payment!";
    }

    return `<h1>${message}</h1>`;
};




export const PaymentServices = {
    initiale,
    confirmantion,
};
