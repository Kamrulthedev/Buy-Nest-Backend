import { Prisma, Product } from "@prisma/client";
import { IPagination } from "../../Interfaces/Pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/SharedPrisma";
import { Request } from "express";
import { UploadedFile } from "../../Interfaces/UploadedFileType";
import { Fileuploader } from "../../../helpars/fileUploads";
import { IProductFilterRequest } from "./product.interface";
import { ProductSearchAvleFields } from "./constent";


const CreateProduct = async (req: Request): Promise<Product> => {
    try {
        const file = req.file as UploadedFile;

        if (file) {
            const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
            req.body.imageUrl = uploadToCloudinary?.secure_url;
        }

        const { name, description, price, discount, stock, category, shopId } = req.body;

        // Basic validation
        if (!shopId) throw new Error("Shop ID is required!");
        if (!name || !description || !price || !category || !stock) throw new Error("Missing required fields!");

        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
        });

        if (!shop) throw new Error("Shop not found!");

        // Create the product
        const result = await prisma.product.create({
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
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create product");
    }
};


const GetAllProducts = async (params: IProductFilterRequest, options: IPagination) => {
    try {
        const { page, limit, skip } = paginationHelper.calculatePaginationProducts(options);

        const { searchTram, ...filterValue } = params;
        const andConditions: Prisma.ProductWhereInput[] = [];

        // Search condition
        if (searchTram) {
            andConditions.push({
                OR: ProductSearchAvleFields.map((field) => ({
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
                    [key as keyof typeof filterValue]: {
                        equals: filterValue[key as keyof typeof filterValue],
                    },
                })),
            });
        }

        const whereCondition: Prisma.ProductWhereInput = { AND: andConditions }; // Use ProductWhereInput

        // Fetch products with related data and count
        const [result, totalCount] = await Promise.all([
            prisma.product.findMany({
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
            prisma.product.count({
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
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};



//single-get-data
const GetByProductId = async (id: string) => {
    const result = await prisma.product.findUnique({
        where: {
            id
        },
        include: {
            shop: true,
            reviews: true
        }
    });
    return result;
};



export const ProductsServices = {
    CreateProduct,
    GetAllProducts,
    GetByProductId
};


