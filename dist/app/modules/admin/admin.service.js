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
exports.AdminServices = void 0;
const admin_constent_1 = require("./admin.constent");
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const GetAdmins = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
        const { searchTram } = params, filterValue = __rest(params, ["searchTram"]);
        const andConditions = [];
        // Search condition
        if (searchTram) {
            andConditions.push({
                OR: admin_constent_1.adminSearchAvleFields.map((field) => ({
                    [field]: {
                        contains: searchTram,
                        mode: "insensitive",
                    },
                })),
            });
        }
        // Filter conditions
        if (Object.keys(filterValue).length > 0) {
            andConditions.push({
                AND: Object.keys(filterValue).map((key) => ({
                    [key]: {
                        equals: filterValue[key],
                    },
                })),
            });
        }
        // Soft delete condition
        andConditions.push({ isDeleted: false });
        const whereCondition = { AND: andConditions };
        // Fetch admins and count
        const [result, TotalCount] = yield Promise.all([
            SharedPrisma_1.prisma.admin.findMany({
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
            }),
            SharedPrisma_1.prisma.admin.count({
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
        console.error("Error fetching admins:", error);
        throw new Error("Failed to fetch admins");
    }
});
//single-get-data
const GetById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.admin.findUnique({
        where: {
            id,
            isDeleted: false
        },
    });
    return result;
});
//update-data
const UpdateAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield SharedPrisma_1.prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        },
    });
    const result = yield SharedPrisma_1.prisma.admin.update({
        where: {
            id
        },
        data,
    });
    return result;
});
//delete data
const DeleteFromAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield SharedPrisma_1.prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeletedData = yield transactionClient.admin.delete({
            where: {
                id,
            },
        });
        const userDeletedData = yield transactionClient.user.delete({
            where: {
                email: adminDeletedData.email,
            },
        });
        return adminDeletedData;
    }));
    return result;
});
//Soft Delete Admin
const SoftDeleteFromAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield SharedPrisma_1.prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    });
    const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const adminDeletedData = yield transactionClient.admin.update({
            where: {
                id,
            },
            data: {
                isDeleted: true
            }
        });
        const userDeletedData = yield transactionClient.user.update({
            where: {
                email: adminDeletedData.email,
            },
            data: {
                status: "DELETED"
            }
        });
        return adminDeletedData;
    }));
    return result;
});
exports.AdminServices = {
    GetAdmins,
    GetById,
    UpdateAdmin,
    DeleteFromAdmin,
    SoftDeleteFromAdmin
};
