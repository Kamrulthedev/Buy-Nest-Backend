"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string({ required_error: "Password is Requred!" }),
    name: zod_1.z.string({ required_error: "Name is required!" }),
    email: zod_1.z.string({ required_error: "Email is requied!" }),
    contactNumber: zod_1.z.string({ required_error: "Contect Number is Required!" })
});
//Create Vendor & Shop Validation Schema
const CreateVendorValidation = zod_1.z.object({
    password: zod_1.z.string({ required_error: "Password is Requred!" }),
    name: zod_1.z.string({ required_error: "Name is required!" }),
    email: zod_1.z.string({ required_error: "Email is requied!" }),
    contactNumber: zod_1.z.string({ required_error: "Contect Number is Required!" }),
    address: zod_1.z.string().optional(),
    shopName: zod_1.z.string({ required_error: "Shop Name is Required!" }),
    shopDescription: zod_1.z.string({ required_error: "Shop Description is Required!" })
});
const CreateCustomer = zod_1.z.object({
    password: zod_1.z.string({ required_error: "Password is Requred!" }),
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string({ required_error: "Email is requiend" }),
    profilePhoto: zod_1.z.string().url().optional(),
    contactNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
const UpdateUser = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().optional(),
    contactNumber: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
});
exports.UserValidation = {
    createAdmin,
    CreateVendorValidation,
    CreateCustomer,
    UpdateUser
};
