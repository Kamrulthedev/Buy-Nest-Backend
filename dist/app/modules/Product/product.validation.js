"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const categoryValues = Object.values(client_1.Category);
//Create Vendor & Shop Validation Schema
const CreateProductValidation = zod_1.z.object({
    shopId: zod_1.z.string({ required_error: "Shop Id Is required!" }),
    name: zod_1.z.string({ required_error: "Product name is required!" }),
    imageUrl: zod_1.z.string().optional(),
    stock: zod_1.z.number({ required_error: "Stock quantity is required!" }).min(0, "Stock cannot be negative!"),
    discount: zod_1.z.number().optional(),
    price: zod_1.z.number({ required_error: "Price is required!" }).min(0, "Price must be greater than or equal to 0!"),
    description: zod_1.z.string({ required_error: "Description is required!" }),
    category: zod_1.z.enum(categoryValues, { required_error: "Category is required!" }),
});
const UpdateProductValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    stock: zod_1.z.number().optional(),
    discount: zod_1.z.number().optional(),
    price: zod_1.z.number().optional(),
    description: zod_1.z.string().optional(),
    category: zod_1.z.enum(categoryValues).optional(),
});
exports.ProductValidation = {
    CreateProductValidation,
    UpdateProductValidation
};
