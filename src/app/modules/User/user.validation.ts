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
        qualification: z.string({ required_error: "quilification is required" }),
        currentWorkingPlace: z.string({ required_error: "Current working place is required!" }),
        designation: z.string({ required_error: "Designation is required!" })
    })
});


const CreatePatient = z.object({
    id: z.string().uuid().optional(),
    email: z.string().email(),
    name: z.string().min(1, "Name is required"),
    profilePhoto: z.string().url().optional(),
    contactNumber: z.string().optional(),
    address: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});


export const UserValidation = {
    createAdmin,
    CreateDoctorValidation,
    CreatePatient
};