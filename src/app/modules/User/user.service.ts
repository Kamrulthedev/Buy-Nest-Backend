import { UserRole } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const CreateAdmin = async (data: any) => {
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    password: hashedPassword,
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
