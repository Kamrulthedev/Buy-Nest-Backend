import { z } from "zod";


const createAdmin = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    admin: z.object({
        name: z.string({ required_error: "Name is required!" }),
        email: z.string({ required_error: "Email is requied!" }),
        contactNumber: z.string({ required_error: "Contect Number is Required!" })
    })
});

export const UserValidation = {
    createAdmin
};