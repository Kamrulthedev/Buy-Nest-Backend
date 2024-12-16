import { Admin, Prisma } from "@prisma/client";
import { adminSearchAvleFields } from "./admin.constent";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { IAdminFilterRequest } from "./admin.interface";
import { IPagination } from "../../Interfaces/Pagination";
import { prisma } from "../../../shared/SharedPrisma";



const GetAdmins = async (params: IAdminFilterRequest, options: IPagination) => {
  try {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);

    const { searchTram, ...filterValue } = params;
    const andConditions: Prisma.AdminWhereInput[] = [];

    // Search condition
    if (searchTram) {
      andConditions.push({
        OR: adminSearchAvleFields.map((field) => ({
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

    // Soft delete condition
    andConditions.push({ isDeleted: false });

    const whereCondition: Prisma.AdminWhereInput = { AND: andConditions };

    // Fetch admins and count
    const [result, TotalCount] = await Promise.all([
      prisma.admin.findMany({
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
      }),
      prisma.admin.count({
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
    console.error("Error fetching admins:", error);
    throw new Error("Failed to fetch admins");
  }
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




export const AdminServices = {
  GetAdmins,
  GetById,
  UpdateAdmin,
  DeleteFromAdmin
};
