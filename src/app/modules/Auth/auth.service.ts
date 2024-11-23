import { UserStatus } from "@prisma/client";
import { generateToken, VerifyToken } from "../../../helpars/JwtHelpars";
import { prisma } from "../../../shared/SharedPrisma";
import * as bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../config";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
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
    config.jwt_access_token as string,
    config.jwt_access_token_expires_in as string
  );

  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
      status: userData.status,
    },
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expires_in as string
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
    decodedData = VerifyToken(Token, config.jwt_refresh_token_expires_in as string)
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
        status: UserStatus.ACTIVE
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
      config.jwt_access_token as string,
      config.jwt_access_token_expires_in as string
    );

    return {
      accessToken,
      needPasswordChange: userData.needPasswordChange,
    };
  } catch (err) {
    throw new Error("Could not verify user");
  }
};


const ChangePasword = async (user: any, payload: any) => {
  console.log(payload)
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    }
  })

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("Invalid password");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false
    }
  })
  return {
    message: "Password Change Successfully!"
  }
};


const ForgetPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });
  const resetPasswordToken = generateToken(
    { email: userData.email, role: userData.role },
    config.reset_password_token as string,
    config.reset_token_expires_in as string
  );

  const resetPassLink = config.reset_password_link + `?userId=${userData.id}&token=${resetPasswordToken}`
  await emailSender(userData.email,
    `<html>
      <head>
        <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f6f6f6;
                  margin: 0;
                  padding: 0;
                 }
                .email-container {
                               max-width: 600px;
                               margin: 20px auto;
                               background-color: #ffffff;
                               border-radius: 8px;
                               overflow: hidden;
                               box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                               }
                .email-header {
                              background-color: #4CAF50;
                              color: #ffffff;
                              padding: 20px;
                              text-align: center;
                              }
                .email-body {
                           padding: 20px;
                           color: #333333;
                           line-height: 1.6;
                          }
               .button-container {
                          text-align: center;
                          margin: 20px 0;
                         }
                .button {
                         background-color: #4CAF50;
                         color: #ffffff;
                         padding: 10px 20px;
                         border: none;
                         border-radius: 5px;
                         text-decoration: none;
                         font-size: 16px;
                         cursor: pointer;
                         display: inline-block;
                        }
                .button:hover {
                        background-color: #45a049;
                        }
                .email-footer {
                        background-color: #f1f1f1;
                        padding: 10px;
                        text-align: center;
                        font-size: 12px;
                        color: #777777;
                       }
                a {
                  text-decoration: none;
                  color: inherit;
                  }
              </style>
        </head>
 <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Password Reset Request</h1>
                </div>
                <div class="email-body">
                    <p>Dear User,</p>
                    <p>You recently requested to reset your password. Please click the button below to proceed:</p>
                <div class="button-container">
                    <a href="${resetPassLink}" class="button">Reset Password</a>
                </div>
                    <p>If you did not request this, you can safely ignore this email.</p>
                    <p>Thank you,<br>The Support Team</p>
                </div>
                <div class="email-footer">
                   <p>This email was sent to you because a password reset was requested for your account.</p>
                </div>
           </div>
    </body>
</html>`
  )
  //https://localhost:3000/reset-pass?email=kamrul@gmail.com&token=12eral432nkan3fasdgslkjhaskjd
};


export const AuthService = {
  loginUser,
  RefreshToken,
  ChangePasword,
  ForgetPassword
};
