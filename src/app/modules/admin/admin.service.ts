import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAvleFields } from "./admin.constent";

const prisma = new PrismaClient();

const calculatePagination = (options: {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
}) => {
  const page: number = Number(options.page || 1);
  const limit: number = Number(options.limit || 10);
  const skip: number = Number(page - 1) * limit;

  const sortBy: string = options.sortBy || "createdAt";
  const sortOrder: string = options.sortOrder || "desc";

  return{
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  }
};

const GetAdmins = async (params: any, options: any) => {
  const {page, limit, skip } = calculatePagination;

  const { searchTram, ...filterValue } = params;
  const andCondions: Prisma.AdminWhereInput[] = [];

  if (params.searchTram) {
    andCondions.push({
      OR: adminSearchAvleFields.map((field) => ({
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

  const whereCondition: Prisma.AdminWhereInput = { AND: andCondions };
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip: skip,
    take: limit,
    orderBy:
      options.sortBy && options.orderBy
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  return result;
};

export const AdminServices = {
  GetAdmins,
};
