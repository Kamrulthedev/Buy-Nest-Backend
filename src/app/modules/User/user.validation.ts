import { Gender } from "@prisma/client";
import { z } from "zod";


const createAdmin = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    admin: z.object({
        name: z.string({ required_error: "Name is required!" }),
        email: z.string({ required_error: "Email is requied!" }),
        contactNumber: z.string({ required_error: "Contect Number is Required!" })
    })
});


//Create Doctors Validation Schema
const CreateDoctorValidation = z.object({
    password: z.string({ required_error: "Password is Requred!" }),
    doctor: z.object({
        name: z.string({ required_error: "Name is required!" }),
        email: z.string({ required_error: "Email is requied!" }),
        contactNumber: z.string({ required_error: "Contect Number is Required!" }),
        address: z.string().optional(),
        registrationNumber: z.string(),
        rxperience: z.number().optional(),
        gender: z.enum([Gender.MALE, Gender.FEMALE]),
        appointmentFee: z.number({ required_error: "This Must be Filup!" }),
        qualification: z.string({required_error: "quilification is required"}),
        currentWorkingPlace: z.string({required_error: "Current working place is required!"}),
        designation: z.string({required_error: "Designation is required!"})
    })
});

export const UserValidation = {
    createAdmin,
    CreateDoctorValidation
};