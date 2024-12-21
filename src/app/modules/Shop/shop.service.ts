import { Prisma } from "@prisma/client";
import { IShopFilterRequest } from "./shop.interface";
import { IPagination } from "../../Interfaces/Pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { prisma } from "../../../shared/SharedPrisma";
import { ShopSearchAvleFields } from "./shop.constent";



const GetAllShops = async (params: IShopFilterRequest, options: IPagination) => {
    try {
        const { page, limit, skip } = paginationHelper.calculatePagination(options);

        const { searchTram, ...filterValue } = params;
        const andConditions: Prisma.ShopWhereInput[] = [];  // Ensure this is of type ShopWhereInput[]

        // Search condition
        if (searchTram) {
            andConditions.push({
                OR: ShopSearchAvleFields.map((field) => ({
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

        const whereCondition: Prisma.ShopWhereInput = { AND: andConditions };  // Ensure this matches Prisma.ShopWhereInput

        // Fetch shops with related data (products, orders, followers) and count
        const [result, TotalCount] = await Promise.all([
            prisma.shop.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy:
                    options.sortBy && options.sortOrder
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
            prisma.shop.count({
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
    } catch (error) {
        console.error("Error fetching shops:", error);
        throw new Error("Failed to fetch shops");
    }
};


const GetAllShopsCreateCarts = async () => {
    const result = await prisma.shop.findMany({
        select: {
            id: true,
            name: true
        }
    });
    return result;
};



//single-get-data
const GetByShopId = async (id: string) => {
    const result = await prisma.shop.findUnique({
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
};



const GetByWithVendorShopId = async (id: string) => {
    const result = await prisma.shop.findUnique({
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
};



const UpdateShop = async (id: string, req: any) => {
    const data = req?.body;

    const shopInfo = await prisma.shop.findUniqueOrThrow({
        where: {
            id: id
        }
    });

    const result = await prisma.shop.update({
        where: {
            id: shopInfo?.id
        },
        data: {
            name: data?.name,
            description: data?.description
        }
    });
    return result
};


export const ShopServices = {
    GetAllShops,
    GetByShopId,
    GetByWithVendorShopId,
    GetAllShopsCreateCarts,
    UpdateShop
};
