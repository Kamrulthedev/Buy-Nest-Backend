import { z } from "zod";


const createAdmin = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    name: z.string({ required_error: "Name is required!" }),
    email: z.string({ required_error: "Email is requied!" }),
    contactNumber: z.string({ required_error: "Contect Number is Required!" })
});


//Create Doctors Validation Schema
const CreateDoctorValidation = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    doctor: z.object({
        name: z.string({ required_error: "Name is required!" }),
        email: z.string({ required_error: "Email is requied!" }),
        contactNumber: z.string({ required_error: "Contect Number is Required!" }),
        address: z.string().optional(),
    })
});


const CreatePatient = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    patient: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string({ required_error: "Email is requiend" }),
        profilePhoto: z.string().url().optional(),
        contactNumber: z.string().optional(),
        address: z.string().optional(),
    })
});

const UpdateUser = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
})


export const UserValidation = {
    createAdmin,
    CreateDoctorValidation,
    CreatePatient,
    UpdateUser
};