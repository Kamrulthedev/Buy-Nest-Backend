import { Doctor, Prisma, UserStatus } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IPagination } from "../../Interfaces/Pagination";
import { prisma } from "../../../shared/SharedPrisma";
import { IDoctorFilterRequest } from "./doctor.interface";
import { DoctorSearchAvleFields } from "./doctor.constent";



const GetDoctors = async (params: IDoctorFilterRequest, options: IPagination) => {
    try {
        const { page, limit, skip } = paginationHelper.calculatePagination(options);

        const { searchTram, ...filterValue } = params;
        const andConditions: Prisma.DoctorWhereInput[] = [];

        if (searchTram) {
            andConditions.push({
                OR: DoctorSearchAvleFields.map((field) => ({
                    [field]: {
                        contains: searchTram,
                        mode: "insensitive",
                    },
                })),
            });
        }

        if (Object.keys(filterValue).length > 0) {
            andConditions.push({
                AND: Object.keys(filterValue).map((key) => ({
                    [key as keyof typeof filterValue]: {
                        equals: filterValue[key as keyof typeof filterValue],
                    },
                })),
            });
        }


        // Add soft delete filter
        andConditions.push({ isDeleted: false });

        const whereCondition: Prisma.DoctorWhereInput = { AND: andConditions };

        // Fetch data
        const [result, TotalCount] = await Promise.all([
            prisma.doctor.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy:
                    options.sortBy && options.sortOrder
                        ? {
                            [options.sortBy]: options.sortOrder,
                        }
                        : {
                            createdAt: "desc",
                        },
            }),
            prisma.doctor.count({
                where: whereCondition,
            }),
        ]);

        return {
            meta: {
                page,
                limit,
                total: TotalCount,
            },
            data: result,
        };
    } catch (error) {
        console.error("Error fetching doctors:", error);
        throw new Error("Failed to fetch doctors");
    }
};


const GetByIdDoctors = async (id: string) => {
    console.log(id)
    const result = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: id
        }
    })
    return result
};

//update-data
const UpdateDoctor = async (id: string, data: Partial<Doctor>) => {
    console.log(data)
    await prisma.doctor.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        },
    });
    const result = await prisma.doctor.update({
        where: { id },
        data,
        include: {
            doctorSpecialties: true
        }
    });
    return result;
};



//delete data
const DeleteFromDoctor = async (id: string) => {
    await prisma.doctor.findUniqueOrThrow({
        where: { id },
    });
    const result = await prisma.$transaction(async (transactionClient) => {
        const DoctorDeletedData = await transactionClient.doctor.delete({
            where: { id },
        });
        await transactionClient.user.delete({
            where: { email: DoctorDeletedData.email },
        });
        return DoctorDeletedData;
    });
    return result;
};



//Soft Delete Admin
const SoftDeleteFromDoctor = async (id: string) => {
    await prisma.doctor.findUniqueOrThrow({
        where: { id },
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.doctor.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });
        await transactionClient.user.update({
            where: {
                email: adminDeletedData.email,
            },
            data: {
                status: "DELETED",
            },
        });
        return adminDeletedData;
    });

    return result;
};


export const DoctorsServices = {
    GetDoctors,
    GetByIdDoctors,
    UpdateDoctor,
    DeleteFromDoctor,
    SoftDeleteFromDoctor
};
