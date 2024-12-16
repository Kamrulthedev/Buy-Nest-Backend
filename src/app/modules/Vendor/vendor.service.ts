import { Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IPagination } from "../../Interfaces/Pagination";
import { prisma } from "../../../shared/SharedPrisma";
import { IVendorFilterRequest } from "./vendor.interface";
import { VendorsSearchAvleFields } from "./vendor.constent";


const GetAllVendors = async (params: IVendorFilterRequest, options: IPagination) => {
    try {
        const { page, limit, skip } = paginationHelper.calculatePagination(options);
        const { searchTram, ...filterValue }: any = params;

        const andConditions: Prisma.VendorWhereInput[] = [];

        if (searchTram) {
            andConditions.push({
                OR: VendorsSearchAvleFields.map((field) => ({
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

        const whereCondition: Prisma.VendorWhereInput = { AND: andConditions };

        const [result, TotalCount] = await Promise.all([
            prisma.vendor.findMany({
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
                include: {
                    shop: true
                },
            }),
            prisma.vendor.count({
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
        console.error("Error fetching vendors:", error);
        throw new Error("Failed to fetch vendors");
    }
};



// const GetByIdDoctors = async (id: string) => {
//     console.log(id)
//     const result = await prisma.doctor.findUniqueOrThrow({
//         where: {
//             id: id
//         },

//     })
//     return result
// };


// //update-data
// const UpdateDoctor = async (id: string, data: Partial<Doctor>) => {
//     const { specialties, ...doctorData }: any = data;
//     // console.log(specialties, doctorData)
//     const doctorInfo = await prisma.doctor.findUniqueOrThrow({
//         where: {
//             id,
//             isDeleted: false
//         },
//     });

//     await prisma.$transaction(async (transactionClient) => {
//         await transactionClient.doctor.update({
//             where: { id },
//             data: doctorData,
//             include: {
//                 doctorSpecialties: true
//             }
//         });

//         if (specialties && specialties.length > 0) {

//             ///delete
//             const deleteSpecialtiesIds = specialties.filter((specialty: { isDeleted: boolean; }) => specialty.isDeleted);
//             for (const specialty of deleteSpecialtiesIds) {
//                 await transactionClient.doctorSpecialties.deleteMany({
//                     where: {
//                         doctorId: doctorInfo.id,
//                         specialtiesId: specialty.specialtiesId
//                     }
//                 });
//             }

//             //create 
//             const CreateSpecialtiesIds = specialties.filter((specialty: { isDeleted: boolean; }) => !specialty.isDeleted);
//             for (const specialty of CreateSpecialtiesIds) {
//                 await transactionClient.doctorSpecialties.create({
//                     data: {
//                         doctorId: doctorInfo.id,
//                         specialtiesId: specialty.specialtiesId
//                     }
//                 });
//             }
//         }
//     });
//     const result = await prisma.doctor.findUniqueOrThrow({
//         where: {
//             id: doctorInfo.id
//         },
//         include: {
//             doctorSpecialties: {
//                 include: {
//                     specialties: true
//                 }
//             }
//         }
//     });

//     return result;
// };



// //delete data
// const DeleteFromDoctor = async (id: string) => {
//     await prisma.doctor.findUniqueOrThrow({
//         where: { id },
//     });
//     const result = await prisma.$transaction(async (transactionClient) => {
//         const DoctorDeletedData = await transactionClient.doctor.delete({
//             where: { id },
//         });
//         await transactionClient.user.delete({
//             where: { email: DoctorDeletedData.email },
//         });
//         return DoctorDeletedData;
//     });
//     return result;
// };



// //Soft Delete Admin
// const SoftDeleteFromDoctor = async (id: string) => {
//     await prisma.doctor.findUniqueOrThrow({
//         where: { id },
//     });

//     const result = await prisma.$transaction(async (transactionClient) => {
//         const adminDeletedData = await transactionClient.doctor.update({
//             where: { id },
//             data: {
//                 isDeleted: true,
//             },
//         });
//         await transactionClient.user.update({
//             where: {
//                 email: adminDeletedData.email,
//             },
//             data: {
//                 status: "DELETED",
//             },
//         });
//         return adminDeletedData;
//     });

//     return result;
// };


export const VendorsServices = {
    GetAllVendors
    // UpdateDoctor,
    // DeleteFromDoctor,
    // SoftDeleteFromDoctor
};
