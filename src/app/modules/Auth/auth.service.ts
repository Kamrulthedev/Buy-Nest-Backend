import { prisma } from "../../../shared/SharedPrisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrentPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
      status: userData.status,
    },
    "123456789",
    {
      algorithm : "HS256",
      expiresIn: '15m'
    }
  );

  console.log({accessToken})

  return userData;
};

export const AuthService = {
  loginUser,
};
