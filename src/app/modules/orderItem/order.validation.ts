import { z } from "zod";



//Create Vendor & Shop Validation Schema
const CreateOrderValidation = z.object({
    body: z.object({
      orderId: z.string({ required_error: "Order Id is required!" }),
      productId: z.string({ required_error: "Product Id is required!" }),
      quantity: z.number({ required_error: "Quantity is required!" }),
      price: z.number({ required_error: "Price is required!" }),
    }),
  });


export const OrderValidation = {
    CreateOrderValidation,
};