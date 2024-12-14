import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const loginUserDB = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in Successfully!",
    data: {
      accessToken: result.accessToken,
      user: result.userData,
      needPasswordChange: result.needPasswordChange
    },
  });
});


// const RefreshTokenDB = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthService.RefreshToken(refreshToken);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Refresh Token Created Successfully!",
//     data: result,
//   });
// });


// const ChangePaswordDB = catchAsync(async (req: Request, res: Response): Promise<void> => {
//   const data = req.body;
//   const user = req?.user;
//   const result = await AuthService.ChangePasword(user, data);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Password Change Successfully!",
//     data: result
//   });
// });


// const ForgetPasswordDB = catchAsync(async (req, res) => {
//   const data = req.body;
//   await AuthService.ForgetPassword(data);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Chack Your Email!",
//     data: null
//   })
// });


// const ResetPasswordDB = catchAsync(async (req, res) => {
//   const token = req.headers.authorization || '';
//   const data = req.body;
//   await AuthService.ResetPassword(token , data);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Password Reset Successfully!",
//     data: null
//   })
// });



export const AuthControllar = {
  loginUserDB,
  // RefreshTokenDB,
  // ChangePaswordDB,
  // ForgetPasswordDB,
  // ResetPasswordDB
};
