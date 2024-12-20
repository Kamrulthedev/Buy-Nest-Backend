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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServices = void 0;
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const fileUploads_1 = require("../../../helpars/fileUploads");
const constent_1 = require("./constent");
const AppError_1 = __importDefault(require("../../errors/AppError"));
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
const GetAllProductsWithVendor = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id);
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePaginationProducts(options);
    const shopInfo = yield SharedPrisma_1.prisma.shop.findUniqueOrThrow({
        where: {
            vendorId: id
        }
    });
    if (!shopInfo) {
        throw new AppError_1.default(404, "This Vendor Is not Found!");
    }
    const total = yield SharedPrisma_1.prisma.product.count({
        where: {
            shopId: shopInfo.id
        }
    });
    const result = yield SharedPrisma_1.prisma.product.findMany({
        where: {
            shopId: shopInfo.id
        },
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
            shop: true,
        },
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
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
const UpdateProductId = (id, req) => __awaiter(void 0, void 0, void 0, function* () {
    // const file = req?.body?.file as UploadedFile;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // if (file) {
    //     try {
    //         const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
    //         if (uploadToCloudinary?.secure_url) {
    //             req.body.data.imageUrl = uploadToCloudinary.secure_url;
    //         } else {
    //             throw new Error("Failed to upload image to Cloudinary.");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading file to Cloudinary:", error);
    //         throw error;
    //     }
    // }
    const updatedProduct = yield SharedPrisma_1.prisma.product.update({
        where: { id },
        data: {
            name: (_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.name,
            stock: (_d = (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.stock,
            discount: (_f = (_e = req === null || req === void 0 ? void 0 : req.body) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.discount,
            price: (_h = (_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.price,
            description: (_k = (_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.description,
            category: (_m = (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.category
        },
    });
    return updatedProduct;
});
const DeleteProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield SharedPrisma_1.prisma.product.findUniqueOrThrow({
        where: { id }
    });
    if (!product) {
        throw new Error("Product not found.");
    }
    const result = yield SharedPrisma_1.prisma.product.delete({
        where: { id },
    });
    return result;
});
exports.ProductsServices = {
    CreateProduct,
    GetAllProducts,
    GetByProductId,
    GetAllProductsWithVendor,
    UpdateProductId,
    DeleteProductId
};
