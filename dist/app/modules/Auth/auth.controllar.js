"use strict";
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
exports.AuthControllar = void 0;
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const loginUserDB = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.loginUser(req.body);
    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, { secure: false, httpOnly: true });
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Logged in Successfully!",
        data: {
            accessToken: result.accessToken,
            user: result.userData,
            needPasswordChange: result.needPasswordChange
        },
    });
}));
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
exports.AuthControllar = {
    loginUserDB,
    // RefreshTokenDB,
    // ChangePaswordDB,
    // ForgetPasswordDB,
    // ResetPasswordDB
};
