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
exports.ProductsServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const fileUploads_1 = require("../../../helpars/fileUploads");
const constent_1 = require("./constent");
const CreateProduct = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (file) {
            const uploadToCloudinary = yield fileUploads_1.Fileuploader.uploadToCloudinary(file);
            req.body.imageUrl = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
        }
        const { name, description, price, discount, stock, category, shopId } = req.body;
        // Basic validation
        if (!shopId)
            throw new Error("Shop ID is required!");
        if (!name || !description || !price || !category || !stock)
            throw new Error("Missing required fields!");
        const shop = yield SharedPrisma_1.prisma.shop.findUnique({
            where: { id: shopId },
        });
        if (!shop)
            throw new Error("Shop not found!");
        // Create the product
        const result = yield SharedPrisma_1.prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                discount: discount ? parseFloat(discount) : 0.0,
                stock: parseInt(stock, 10),
                imageUrl: req.body.imageUrl || '',
                category,
                shopId,
            },
        });
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to create product");
    }
});
const GetAllProducts = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePaginationProducts(options);
        const { searchTram } = params, filterValue = __rest(params, ["searchTram"]);
        const andConditions = [];
        // Search condition
        if (searchTram) {
            andConditions.push({
                OR: constent_1.ProductSearchAvleFields.map((field) => ({
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
        const whereCondition = { AND: andConditions }; // Use ProductWhereInput
        // Fetch products with related data and count
        const [result, totalCount] = yield Promise.all([
            SharedPrisma_1.prisma.product.findMany({
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
                    reviews: true,
                    shop: true
                },
            }),
            SharedPrisma_1.prisma.product.count({
                where: whereCondition,
            }),
        ]);
        return {
            meta: {
                page,
                limit,
                total: totalCount,
            },
            data: result,
        };
    }
    catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
});
//single-get-data
const GetByProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.product.findUnique({
        where: {
            id
        },
        include: {
            shop: true,
            reviews: true
        }
    });
    return result;
});
exports.ProductsServices = {
    CreateProduct,
    GetAllProducts,
    GetByProductId
};
