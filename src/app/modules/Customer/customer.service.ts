import { Customer, Prisma } from "@prisma/client";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/SharedPrisma";
import { IPagination } from "../../Interfaces/Pagination";
import { ICustomerFilterRequest } from "./customer.interface";
import { CustomerSearchableFields } from "./customer.constent";



const GetAllCustomer = async (
    filters: ICustomerFilterRequest,
    options: IPagination,
) => {
    try {
        const { limit, page, skip } = paginationHelper.calculatePagination(options);
        const { searchTerm, ...filterData } = filters;

        const andConditions = [];

        if (searchTerm) {
            andConditions.push({
                OR: CustomerSearchableFields.map(field => ({
                    [field]: {
                        contains: searchTerm,
                        mode: 'insensitive',
                    },
                })),
            });
        }

        if (Object.keys(filterData).length > 0) {
            andConditions.push({
                AND: Object.keys(filterData).map(key => ({
                    [key]: {
                        equals: (filterData as any)[key],
                    },
                })),
            });
        }

        andConditions.push({
            isDeleted: false,
        });

        const whereConditions: Prisma.CustomerWhereInput =
            andConditions.length > 0 ? { AND: andConditions } : {};

        const result = await prisma.customer.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy:
                options.sortBy && options.sortOrder
                    ? { [options.sortBy]: options.sortOrder }
                    : {
                        createdAt: 'desc',
                    },
            include: {
                Order: true,
                Review: true,
                Follow: true,
            },
        });

        const total = await prisma.customer.count({
            where: whereConditions,
        });

        return {
            meta: {
                total,
                page,
                limit,
            },
            data: result,
        };
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw new Error("Failed to fetch customers");
    }
};



const GetByIdFrom = async (id: string): Promise<Customer | null> => {
    const result = await prisma.customer.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            Order: true,
            Follow: true,
            Review: true,
        },
    });
    return result;
};


// const UpdateInto = async (id: string, payload: Partial<IPatientUpdate>): Promise<Patient | null> => {
//   const { patientHealhData, medicalReport, ...patientData }: any = payload;

//   const patientInfo = await prisma.patient.findUniqueOrThrow({
//     where: {
//       id,
//       isDeleted: false
//     }
//   });

//   await prisma.$transaction(async (transactionClient) => {
//     //update patient data
//     await transactionClient.patient.update({
//       where: {
//         id
//       },
//       data: patientData,
//       include: {
//         patientHealthData: true,
//         medicalReport: true
//       }
//     });

//     // create or update patient health data
//     if (patientHealhData) {
//       await transactionClient.patientHealthData.upsert({
//         where: {
//           patientId: patientInfo.id
//         },
//         update: patientHealhData,
//         create: { ...patientHealhData, patientId: patientInfo.id }
//       });
//     };

//     if (medicalReport) {
//       await transactionClient.medicalReport.create({
//         data: { ...medicalReport, patientId: patientInfo.id }
//       })
//     }
//   })


//   const responseData = await prisma.patient.findUnique({
//     where: {
//       id: patientInfo.id
//     },
//     include: {
//       patientHealthData: true,
//       medicalReport: true
//     }
//   })
//   return responseData;
// };


// const DeleteFrom = async (id: string): Promise<Patient | null> => {
//   const result = await prisma.$transaction(async (tx) => {
//     // delete medical report
//     await tx.medicalReport.deleteMany({
//       where: {
//         patientId: id
//       }
//     });

//     // delete patient health data
//     await tx.patientHealthData.delete({
//       where: {
//         patientId: id
//       }
//     });

//     const deletedPatient = await tx.patient.delete({
//       where: {
//         id
//       }
//     });

//     await tx.user.delete({
//       where: {
//         email: deletedPatient.email
//       }
//     });

//     return deletedPatient;
//   });

//   return result;
// };



// const SoftDelete = async (id: string): Promise<Patient | null> => {
//   return await prisma.$transaction(async transactionClient => {
//     const deletedPatient = await transactionClient.patient.update({
//       where: { id },
//       data: {
//         isDeleted: true,
//       },
//     });

//     await transactionClient.user.update({
//       where: {
//         email: deletedPatient.email,
//       },
//       data: {
//         status: UserStatus.DELETED,
//       },
//     });

//     return deletedPatient;
//   });
// };

export const CustomerServices = {
    GetAllCustomer,
    GetByIdFrom
};