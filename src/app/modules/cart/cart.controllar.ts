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

const DelteCartDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await CartssServices.DeleteCart(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Delete Cart Successfully!",
        data: result,
    });
});



const AllCartsDB = catchAsync(async (req, res) => {
    const result = await CartssServices.AllCartsGet();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "All Carts Get Successfully!",
        data: result,
    });
});


const UserCartsDB = catchAsync(async (req, res) => {
    const {id} = req.params;
    const result = await CartssServices.USerCartsGet(id as string);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "USer Carts Get Successfully!",
        data: result,
    });
});


export const CartControllars = {
    CreateCartDB,
    DelteCartDB,
    AllCartsDB,
    UserCartsDB
};