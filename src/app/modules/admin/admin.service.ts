import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetAdmins = async (params: any) => {
  const andCondions : Prisma.AdminWhereInput[] = [];

  if (params.searchTram) {
    andCondions.push({
      OR: [
        {
          name: {
            contains: params.searchTram,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: params.searchTram,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const whereCondition : Prisma.AdminWhereInput = { AND: andCondions };
  const result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const AdminServices = {
  GetAdmins,
};
