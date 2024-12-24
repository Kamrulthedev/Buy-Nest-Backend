"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = require("zod");
//Create Vendor & Shop Validation Schema
const CreateOrderValidation = zod_1.z.object({
    body: zod_1.z.object({
        orderId: zod_1.z.string({ required_error: "Order Id is required!" }),
        productId: zod_1.z.string({ required_error: "Product Id is required!" }),
        quantity: zod_1.z.number({ required_error: "Quantity is required!" }),
        price: zod_1.z.number({ required_error: "Price is required!" }),
    }),
});
exports.OrderValidation = {
    CreateOrderValidation,
};
