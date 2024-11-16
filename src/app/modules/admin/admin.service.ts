import { Admin, Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAvleFields } from "./admin.constent";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IAdminFilterRequest } from "./admin.interface";
import { IPagination } from "../../Interfaces/Pagination";

const prisma = new PrismaClient();

const GetAdmins = async (params: IAdminFilterRequest, options: IPagination) => {
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
          equals: (filterValue as any)[kay],
        },
      })),
    });
  }

  andCondions.push({
    isDeleted : false
  });

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
      isDeleted: false
    },
  });
  return result;
};

//update-data
const UpdateAdmin = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted : false
    },
  });

  const result = await prisma.admin.update({
    where: {
      id
    },
    data,
  });
  return result;
};


//delete data
const DeleteFromAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where : {
      id
    }
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });
    const userDeletedData = await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });
    return adminDeletedData
  });

  return result
};


//Soft Delete Admin
const SoftDeleteFromAdmin = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where : {
      id
    }
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: {
        id,
      },
      data : {
        isDeleted : true
      }
    });
    const userDeletedData = await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data : {
          status : "DELETED"
      }
    });
    return adminDeletedData
  });

  return result
};



export const AdminServices = {
  GetAdmins,
  GetById,
  UpdateAdmin,
  DeleteFromAdmin,
  SoftDeleteFromAdmin
};
