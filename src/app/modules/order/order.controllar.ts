import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrdersServices } from "./order.service";




const CreateOrderDB = catchAsync(async (req, res) => {
    const result = await OrdersServices.CreateOrder(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Create Order Successfully!",
        data: result,
    });
});


// const GetUserCartItemDB = catchAsync(async (req, res) => {
//     const {id} = req?.params;
//     const result = await CartItemServices.GetUserCartItems(id);
//     sendResponse(res, {
//         statusCode: 200,
//         success: true,
//         message: "User Cart Items fatched Successfully!",
//         data: result,
//     });
// });


export const OrderControllers = {
    CreateOrderDB,
};