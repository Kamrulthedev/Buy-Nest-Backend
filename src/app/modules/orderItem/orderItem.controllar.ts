import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderItemServices } from "./orderItem.service";




const CreateOrderItemDB = catchAsync(async (req, res) => {
    const result = await OrderItemServices.CreateOrderItem(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Create Order Item Successfully!",
        data: result,
    });
});


const GetUserOrdersItemDB = catchAsync(async (req, res) => {
    const {id} = req?.params;
    const result = await OrderItemServices.GetUserOrdersItems(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Orders Items fatched Successfully!",
        data: result,
    });
});


export const OrderItemControllers = {
    CreateOrderItemDB,
    GetUserOrdersItemDB
};