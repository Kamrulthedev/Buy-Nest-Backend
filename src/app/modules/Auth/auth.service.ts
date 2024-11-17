import { UserStatus } from "@prisma/client";
import { generateToken, VerifyToken } from "../../../helpars/JwtHelpars";
import { prisma } from "../../../shared/SharedPrisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status : UserStatus.ACTIVE
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
    process.env.JWT_ACCESS_TOKEN as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      status: userData.status,
    },
    process.env.JWT_REFRESH_TOKEN as string,
    process.env.JWT_REFRESH_EXPIRES_IN as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

//create refresh Token
const RefreshToken = async (Token: string) => {
  let decodedData;

  try {
    decodedData = VerifyToken(Token, process.env.JWT_REFRESH_TOKEN as string)
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  // Validate decoded data before querying
  if (!decodedData || typeof decodedData !== "object" || !decodedData.email) {
    throw new Error("Invalid token payload");
  }

  try {
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decodedData.email,
        status : UserStatus.ACTIVE
      },
    });

    if (!userData) {
      throw new Error("User not found");
    }
    const accessToken = generateToken(
      {
        email: userData.email,
        role: userData.role,
        status: userData.status,
      },
      process.env.JWT_ACCESS_TOKEN as string,
      process.env.JWT_ACCESS_EXPIRES_IN as string
    );

    return {
      accessToken,
      needPasswordChange: userData.needPasswordChange,
    };
  } catch (err) {
    throw new Error("Could not verify user");
  }
};

export const AuthService = {
  loginUser,
  RefreshToken,
};
