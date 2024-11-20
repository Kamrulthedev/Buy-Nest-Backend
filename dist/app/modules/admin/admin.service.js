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
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination;
    const { searchTram } = params, filterValue = __rest(params, ["searchTram"]);
    const andCondions = [];
    if (params.searchTram) {
        andCondions.push({
            OR: admin_constent_1.adminSearchAvleFields.map((field) => ({
                [field]: {
                    contains: params.searchTram,
                    mode: "insensitive",
                },
            })),
        });
    }
    if (Object.keys(filterValue).length > 0) {
        andCondions.push({
            AND: Object.keys(filterValue).map((kay) => ({
                [kay]: {
                    equals: filterValue[kay],
                },
            })),
        });
    }
    andCondions.push({
        isDeleted: false
    });
    const whereCondition = { AND: andCondions };
    const result = yield SharedPrisma_1.prisma.admin.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: options.sortBy && options.orderBy
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
    });
    const TotalCount = yield SharedPrisma_1.prisma.admin.count({
        where: whereCondition,
    });
    return {
        meta: {
            page,
            limit,
            total: TotalCount,
        },
        data: result,
    };
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
