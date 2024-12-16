import { z } from "zod";


const createAdmin = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is requied!" }),
    contactNumber: z.string({ required_error: "Contect Number is Required!" })
});


//Create Vendor & Shop Validation Schema
const CreateVendorValidation = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is requied!" }),
    contactNumber: z.string({ required_error: "Contect Number is Required!" }),
    address: z.string().optional(),
    shopName: z.string({required_error: "Shop Name is Required!"}),
    shopDescription: z.string({required_error: "Shop Description is Required!"})
});


const CreateCustomer = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    name: z.string().min(1, "Name is required"),
    email: z.string({ required_error: "Email is requiend" }),
    profilePhoto: z.string().url().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
});

const UpdateUser = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
})


export const UserValidation = {
    createAdmin,
    CreateVendorValidation,
    CreateCustomer,
    UpdateUser
};