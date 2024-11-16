import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";

const loginUserDB = catchAsync(async(req, res) =>{
     const result = await AuthService.loginUser(req.body);
     sendResponse(res, {
        statusCode : 200,
        success : true,
        message : "Logged in Successfully!",
        data : result
     })
});


export const AuthControllar = {
    loginUserDB
};