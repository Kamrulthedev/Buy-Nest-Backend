import { generateToken } from "../../../helpars/JwtHelpars";
import { prisma } from "../../../shared/SharedPrisma";
import * as bcrypt from "bcrypt";


const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  // Ensure both passwords are strings
  if (
    typeof payload.password !== "string" ||
    typeof userData.password !== "string"
  ) {
    throw new Error("Invalid password or user data format");
  }

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  //create token
  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      status: userData.status,
    },
    "123456789",
    "5m"
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      status: userData.status,
    },
    "123456789",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
