import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const loginUserDB = catchAsync(async(req, res) =>{
     const result = await AuthService.loginUser(req.body);

     const {refreshToken} = result;
     res.cookie('refreshToken', refreshToken, {secure: false, httpOnly: true})

     sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Logged in Successfully!",
        data : {
            accessToken: result.accessToken,
            needPasswordChange:result.needPasswordChange
        }
     })
});

const RefreshTokenDB = catchAsync(async(req, res)=>{
    const {refreshToken} =  req.cookies;

    const result = await AuthService.RefreshToken(refreshToken)
  sendResponse(res, {
    statusCode: 200, 
    success : true,
    message: "Refresh Token Created!",
    data : result
  })
});


export const AuthControllar = {
    loginUserDB,
    RefreshTokenDB
};