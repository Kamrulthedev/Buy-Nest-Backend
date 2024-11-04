import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetAdmins = async (params: any) => {
  console.log({ params });

  const result = await prisma.admin.findMany({
    where: {
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
    },
  });
  return result;
};

export const AdminServices = {
  GetAdmins,
};
