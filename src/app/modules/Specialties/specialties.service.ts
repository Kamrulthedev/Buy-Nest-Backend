import { Request } from "express";
import { Fileuploader } from "../../../helpars/fileUploads";
import { prisma } from "../../../shared/SharedPrisma";
import { UploadedFile } from "../../Interfaces/UploadedFileType";


//single-get-data
const InsertInto = async (req: Request) => {
    console.log(req.file, req.body)

    const file = req?.file as UploadedFile;
    if (file) {
        const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }
    const result = await prisma.specialties.create({
        data: req.body
    });
    return result
};


const GetSpecialties = async () => {
    const result = await prisma.specialties.findMany()
    return result
};

const GetByIdSpecialties = async (id: string) => {
    const result = await prisma.specialties.findUniqueOrThrow({
        where: {
            id: id
        }
    })
    return result
};

const DeleteSpecialties = async (id: string) => {
    const result = await prisma.specialties.delete({
        where: {
            id: id
        }
    })
    return result
};

export const SpecialtiesServices = {
    InsertInto,
    GetSpecialties,
    GetByIdSpecialties,
    DeleteSpecialties

};