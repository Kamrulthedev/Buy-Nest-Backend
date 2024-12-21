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


const GetUserCartItemDB = catchAsync(async (req, res) => {
    const {id} = req?.params;
    const result = await CartItemServices.GetUserCartItems(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Cart Items fatched Successfully!",
        data: result,
    });
});


export const CartItemControllers = {
    CreateCartItemDB,
    GetUserCartItemDB
};