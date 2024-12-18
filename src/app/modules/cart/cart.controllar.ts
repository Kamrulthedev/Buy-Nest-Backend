import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CartssServices } from "./cart.service";


const CreateCartDB = catchAsync(async (req, res) => {
    const result = await CartssServices.CreateCart(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Create Cart Successfully!",
        data: result,
    });
});


export const CartControllars = {
    CreateCartDB
};