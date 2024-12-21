import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CartItemServices } from "./cartItem.service";



const CreateCartItemDB = catchAsync(async (req, res) => {
    const result = await CartItemServices.CreateCartItem(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Create Cart Item Successfully!",
        data: result,
    });
});


export const CartItemControllers = {
    CreateCartItemDB
};