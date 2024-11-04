import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const GetAdmins = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminServices = {
  GetAdmins,
};
