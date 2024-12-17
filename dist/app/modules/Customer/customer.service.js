"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const customer_constent_1 = require("./customer.constent");
const GetAllCustomer = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, page, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
        const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                OR: customer_constent_1.CustomerSearchableFields.map(field => ({
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
                        equals: filterData[key],
                    },
                })),
            });
        }
        andConditions.push({
            isDeleted: false,
        });
        const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
        const result = yield SharedPrisma_1.prisma.customer.findMany({
            where: whereConditions,
            skip,
            take: limit,
            orderBy: options.sortBy && options.sortOrder
                ? { [options.sortBy]: options.sortOrder }
                : {
                    createdAt: 'desc',
                },
            include: {
                Cart: true,
                Order: true,
                Review: true,
                Follow: true,
            },
        });
        const total = yield SharedPrisma_1.prisma.customer.count({
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
    }
    catch (error) {
        console.error("Error fetching customers:", error);
        throw new Error("Failed to fetch customers");
    }
});
const GetByIdFrom = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.customer.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            Order: true,
            Follow: true,
            Review: true,
            Cart: true
        },
    });
    return result;
});
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
exports.CustomerServices = {
    GetAllCustomer,
    GetByIdFrom
};
