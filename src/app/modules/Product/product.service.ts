import { Prisma, Product } from "@prisma/client";
import { IPagination } from "../../Interfaces/Pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/SharedPrisma";
import { Request } from "express";
import { UploadedFile } from "../../Interfaces/UploadedFileType";
import { Fileuploader } from "../../../helpars/fileUploads";


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


// const GetAllShops = async (params: IShopFilterRequest, options: IPagination) => {
//     try {
//         const { page, limit, skip } = paginationHelper.calculatePagination(options);

//         const { searchTram, ...filterValue } = params;
//         const andConditions: Prisma.ShopWhereInput[] = [];  

//         // Search condition
//         if (searchTram) {
//             andConditions.push({
//                 OR: ShopSearchAvleFields.map((field) => ({
//                     [field]: {
//                         contains: searchTram,
//                         mode: "insensitive",
//                     },
//                 })),
//             });
//         }

//         // Filter conditions
//         if (Object.keys(filterValue).length > 0) {
//             andConditions.push({
//                 AND: Object.keys(filterValue).map((key) => ({
//                     [key as keyof typeof filterValue]: {
//                         equals: filterValue[key as keyof typeof filterValue],
//                     },
//                 })),
//             });
//         }

//         const whereCondition: Prisma.ShopWhereInput = { AND: andConditions };  // Ensure this matches Prisma.ShopWhereInput

//         // Fetch shops with related data (products, orders, followers) and count
//         const [result, TotalCount] = await Promise.all([
//             prisma.shop.findMany({
//                 where: whereCondition,
//                 skip,
//                 take: limit,
//                 orderBy:
//                     options.sortBy && options.sortOrder
//                         ? {
//                             [options.sortBy]: options.sortOrder,
//                         }
//                         : {
//                             createdAt: "desc",
//                         },
//                 include: {
//                     vendor: true,
//                     products: true,
//                     orders: true,
//                     followers: true,
//                 },
//             }),
//             prisma.shop.count({
//                 where: whereCondition,
//             }),
//         ]);

//         return {
//             meta: {
//                 page,
//                 limit,
//                 total: TotalCount,
//             },
//             data: result,
//         };
//     } catch (error) {
//         console.error("Error fetching shops:", error);
//         throw new Error("Failed to fetch shops");
//     }
// };



//single-get-data
// const GetByShopId = async (id: string) => {
//     const result = await prisma.shop.findUnique({
//         where: {
//             id
//         },
//         include: {
//             vendor: true
//         }
//     });
//     return result;
// };



export const ProductsServices = {
    CreateProduct
};


