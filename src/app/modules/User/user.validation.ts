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
    password: z.string({ required_error: "Password is Requred!" }),
    patient: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string({required_error : "Email is requiend"}),
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
    registrationNumber: z.string().optional(),
    rxperience: z.number().optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
    appointmentFee: z.number().optional(),
    qualification: z.string().optional(),
    currentWorkingPlace: z.string().optional(),
    designation: z.string().optional()

})


export const UserValidation = {
    createAdmin,
    CreateDoctorValidation,
    CreatePatient,
    UpdateUser
};