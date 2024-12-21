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
exports.ShopServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const shop_constent_1 = require("./shop.constent");
const GetAllShops = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
        const { searchTram } = params, filterValue = __rest(params, ["searchTram"]);
        const andConditions = []; // Ensure this is of type ShopWhereInput[]
        // Search condition
        if (searchTram) {
            andConditions.push({
                OR: shop_constent_1.ShopSearchAvleFields.map((field) => ({
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
        const whereCondition = { AND: andConditions }; // Ensure this matches Prisma.ShopWhereInput
        // Fetch shops with related data (products, orders, followers) and count
        const [result, TotalCount] = yield Promise.all([
            SharedPrisma_1.prisma.shop.findMany({
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
                    vendor: true,
                    products: true,
                    orders: true,
                    followers: true,
                },
            }),
            SharedPrisma_1.prisma.shop.count({
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
        console.error("Error fetching shops:", error);
        throw new Error("Failed to fetch shops");
    }
});
const GetAllShopsCreateCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.shop.findMany({
        select: {
            id: true,
            name: true
        }
    });
    return result;
});
//single-get-data
const GetByShopId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.shop.findUnique({
        where: {
            id
        },
        include: {
            vendor: true,
            products: true,
            orders: true,
            followers: true
        }
    });
    return result;
});
const GetByWithVendorShopId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.shop.findUnique({
        where: {
            vendorId: id
        },
        include: {
            vendor: true,
            products: true,
            orders: true,
            followers: true,
        }
    });
    return result;
});
const UpdateShop = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req === null || req === void 0 ? void 0 : req.body;
    const shopInfo = yield SharedPrisma_1.prisma.shop.findUniqueOrThrow({
        where: {
            id: id
        }
    });
    const result = yield SharedPrisma_1.prisma.shop.update({
        where: {
            id: shopInfo === null || shopInfo === void 0 ? void 0 : shopInfo.id
        },
        data: {
            name: data === null || data === void 0 ? void 0 : data.name,
            description: data === null || data === void 0 ? void 0 : data.description
        }
    });
    return result;
});
exports.ShopServices = {
    GetAllShops,
    GetByShopId,
    GetByWithVendorShopId,
    GetAllShopsCreateCarts,
    UpdateShop
};
