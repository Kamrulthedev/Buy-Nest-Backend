import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CreateAdmin = async (data: any) => {
  const userData = {
    password: data.password,
    email: data.admin.email,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdmindata = await transactionClient.admin.create({
      data: data.admin,
    });
    return createdAdmindata;
  });

  return result;
};

export const UserServices = {
  CreateAdmin,
};
