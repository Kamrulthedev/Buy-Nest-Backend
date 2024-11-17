import { prisma } from "../../../shared/SharedPrisma";
import * as bcrypt from "bcrypt";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrentPassword : boolean = await bcrypt.compare(payload.password, userData.password);

  return userData;
};




export const AuthService = {
  loginUser,
};
