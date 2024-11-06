import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAvleFields } from "./admin.constent";
import { paginationHelper } from "../../../helpars/paginationHelper";

const prisma = new PrismaClient();

const GetAdmins = async (params: any, options: any) => {
  const { page, limit, skip }: any = paginationHelper.calculatePagination;

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

  const TotalCount = await prisma.admin.count({
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
};

//single-get-data
const GetById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

//update-data
const UpdateAdmin = async (id: string, data: Partial<Admin>) => {
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};

export const AdminServices = {
  GetAdmins,
  GetById,
  UpdateAdmin,
};
