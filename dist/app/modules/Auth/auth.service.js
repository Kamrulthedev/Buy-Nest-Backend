"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const JwtHelpars_1 = require("../../../helpars/JwtHelpars");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield SharedPrisma_1.prisma.user.findUnique({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    if (!userData) {
        throw new Error("User not found or inactive");
    }
    if (typeof payload.password !== "string" ||
        typeof userData.password !== "string") {
        throw new Error("Invalid password or user data format");
    }
    const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Invalid password");
    }
    //create token
    const accessToken = (0, JwtHelpars_1.generateToken)({
        email: userData.email,
        role: userData.role,
        status: userData.status,
    }, config_1.default.jwt_access_token, config_1.default.jwt_access_token_expires_in);
    const refreshToken = (0, JwtHelpars_1.generateToken)({
        email: userData.email,
        role: userData.role,
        status: userData.status,
    }, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_token_expires_in);
    // Define user-specific data structure
    let roleData;
    switch (userData.role) {
        case client_1.UserRole.ADMIN:
            roleData = yield SharedPrisma_1.prisma.admin.findUnique({
                where: { email: userData.email },
            });
            break;
        case client_1.UserRole.VENDOR:
            roleData = yield SharedPrisma_1.prisma.vendor.findUnique({
                where: { email: userData.email },
            });
            break;
        case client_1.UserRole.CUSTOMER:
            roleData = yield SharedPrisma_1.prisma.customer.findUnique({
                where: { email: userData.email },
            });
            break;
        default:
            throw new Error("Invalid user role");
    }
    if (!roleData) {
        throw new Error("User data not found");
    }
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange,
        userData: {
            name: roleData.name,
            email: userData.email,
            contactNumber: roleData.contactNumber,
            role: userData.role,
            profilePhoto: roleData.profilePhoto,
            address: roleData.address,
            needPasswordChange: userData.needPasswordChange,
            status: userData.status,
            isDeleted: roleData.isDeleted,
            createdAt: roleData.createdAt,
            updatedAt: roleData.updatedAt
        },
    };
});
// //create refresh Token
// const RefreshToken = async (Token: string) => {
//   let decodedData;
//   try {
//     decodedData = VerifyToken(Token, config.jwt_refresh_token_expires_in as string)
//   } catch (err) {
//     throw new Error("You are not authorized!");
//   }
//   // Validate decoded data before querying
//   if (!decodedData || typeof decodedData !== "object" || !decodedData.email) {
//     throw new Error("Invalid token payload");
//   }
//   try {
//     const userData = await prisma.user.findUniqueOrThrow({
//       where: {
//         email: decodedData.email,
//         status: UserStatus.ACTIVE
//       },
//     });
//     if (!userData) {
//       throw new Error("User not found");
//     }
//     const accessToken = generateToken(
//       {
//         email: userData.email,
//         role: userData.role,
//         status: userData.status,
//       },
//       config.jwt_access_token as string,
//       config.jwt_access_token_expires_in as string
//     );
//     return {
//       accessToken,
//       needPasswordChange: userData.needPasswordChange,
//     };
//   } catch (err) {
//     throw new Error("Could not verify user");
//   }
// };
// const ChangePasword = async (user: any, payload: any) => {
//   console.log(payload)
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user.email
//     }
//   })
//   const isCorrectPassword: boolean = await bcrypt.compare(
//     payload.oldPassword,
//     userData.password
//   );
//   if (!isCorrectPassword) {
//     throw new Error("Invalid password");
//   }
//   const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);
//   await prisma.user.update({
//     where: {
//       email: userData.email,
//       status: UserStatus.ACTIVE
//     },
//     data: {
//       password: hashedPassword,
//       needPasswordChange: false
//     }
//   })
//   return {
//     message: "Password Change Successfully!"
//   }
// };
// const ForgetPassword = async (payload: { email: string }) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: payload.email,
//       status: UserStatus.ACTIVE
//     },
//   });
//   const resetPasswordToken = generateToken(
//     { email: userData.email, role: userData.role },
//     config.reset_password_token as string,
//     config.reset_token_expires_in as string
//   );
//  //create reset password Link
//   const resetPassLink = config.reset_password_link + `?userId=${userData.id}&token=${resetPasswordToken}`
//   await emailSender(userData.email,
//     `<html>
//       <head>
//         <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Password Reset</title>
//               <style>
//                 body {
//                   font-family: Arial, sans-serif;
//                   background-color: #f6f6f6;
//                   margin: 0;
//                   padding: 0;
//                  }
//                 .email-container {
//                                max-width: 600px;
//                                margin: 20px auto;
//                                background-color: #ffffff;
//                                border-radius: 8px;
//                                overflow: hidden;
//                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//                                }
//                 .email-header {
//                               background-color: #4CAF50;
//                               color: #ffffff;
//                               padding: 20px;
//                               text-align: center;
//                               }
//                 .email-body {
//                            padding: 20px;
//                            color: #333333;
//                            line-height: 1.6;
//                           }
//                .button-container {
//                           text-align: center;
//                           margin: 20px 0;
//                          }
//                 .button {
//                          background-color: #4CAF50;
//                          color: #ffffff;
//                          padding: 10px 20px;
//                          border: none;
//                          border-radius: 5px;
//                          text-decoration: none;
//                          font-size: 16px;
//                          cursor: pointer;
//                          display: inline-block;
//                         }
//                 .button:hover {
//                         background-color: #45a049;
//                         }
//                 .email-footer {
//                         background-color: #f1f1f1;
//                         padding: 10px;
//                         text-align: center;
//                         font-size: 12px;
//                         color: #777777;
//                        }
//                 a {
//                   text-decoration: none;
//                   color: inherit;
//                   }
//               </style>
//         </head>
//     <body>
//             <div class="email-container">
//                 <div class="email-header">
//                     <h1>Password Reset Request</h1>
//                 </div>
//                 <div class="email-body">
//                     <p>Dear User,</p>
//                     <p>You recently requested to reset your password. Please click the button below to proceed:</p>
//                 <div class="button-container">
//                     <a href="${resetPassLink}" class="button">Reset Password</a>
//                 </div>
//                     <p>If you did not request this, you can safely ignore this email.</p>
//                     <p>Thank you,<br>The Support Team</p>
//                 </div>
//                 <div class="email-footer">
//                    <p>This email was sent to you because a password reset was requested for your account.</p>
//                 </div>
//            </div>
//     </body>
// </html>`
//   )
//   //https://localhost:3000/reset-pass?email=kamrul@gmail.com&token=12eral432nkan3fasdgslkjhaskjd
// };
// const ResetPassword = async (token: string, payload: { id: string, Password: string }) => {
//   console.log({ token, payload });
//   const user = await prisma.user.findUniqueOrThrow({
//     where: {
//       id: payload.id,
//       status: UserStatus.ACTIVE
//     }
//   });
//   const isValidToken = VerifyToken(token, config.reset_password_token as Secret);
//   console.log(isValidToken);
//   if (!isValidToken) {
//     throw new AppError(403, "Forbidden Access!");
//   }
//   const hashedPassword: string = await bcrypt.hash(payload.Password, 12);
//   await prisma.user.update({
//     where: {
//       id: payload.id,
//       status: UserStatus.ACTIVE
//     },
//     data: {
//       password: hashedPassword,
//       needPasswordChange: false
//     }
//   })
//   return {
//     message: "Password Reset Successfully!"
//   }
// };
exports.AuthService = {
    loginUser,
    // RefreshToken,
    // ChangePasword,
    // ForgetPassword,
    // ResetPassword
};
