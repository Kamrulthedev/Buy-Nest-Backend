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


const GetUserOrderDB = catchAsync(async (req, res) => {
    const {id} = req?.params;
    const result = await OrdersServices.GetUserOrders(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Orders fatched Successfully!",
        data: result,
    });
});


export const OrderControllers = {
    CreateOrderDB,
    GetUserOrderDB
};