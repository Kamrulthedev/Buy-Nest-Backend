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
exports.VendorsServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const vendor_constent_1 = require("./vendor.constent");
const GetAllVendors = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
        const { searchTram } = params, filterValue = __rest(params, ["searchTram"]);
        const andConditions = [];
        if (searchTram) {
            andConditions.push({
                OR: vendor_constent_1.VendorsSearchAvleFields.map((field) => ({
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
                    [key]: {
                        equals: filterValue[key],
                    },
                })),
            });
        }
        // Add soft delete filter
        andConditions.push({ isDeleted: false });
        const whereCondition = { AND: andConditions };
        const [result, TotalCount] = yield Promise.all([
            SharedPrisma_1.prisma.vendor.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy: options.sortBy && options.sortOrder
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
            SharedPrisma_1.prisma.vendor.count({
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
    }
    catch (error) {
        console.error("Error fetching vendors:", error);
        throw new Error("Failed to fetch vendors");
    }
});
const GetByIdVendor = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.vendor.findUniqueOrThrow({
        where: {
            id: id
        },
        include: {
            shop: true
        }
    });
    return result;
});
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
exports.VendorsServices = {
    GetAllVendors,
    GetByIdVendor,
    // UpdateDoctor,
    // DeleteFromDoctor,
    // SoftDeleteFromDoctor
};
