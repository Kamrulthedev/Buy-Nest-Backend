import { Prisma, PrismaClient } from "@prisma/client";
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
    where : whereCondition
  });

  return {
    meta: {
      page,
      limit,
      total : TotalCount
    },
    data: result,
  };
};


const GetById = async() =>{
  console.log("get by Id console")
};


export const AdminServices = {
  GetAdmins,
  GetById
};
