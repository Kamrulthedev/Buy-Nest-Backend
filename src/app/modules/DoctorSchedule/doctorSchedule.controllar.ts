import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorScheduleServices } from "./doctorSchedule.service";


const InsertIntoDB = catchAsync(async (req , res) => {
    const user = req.user;
    const result = await DoctorScheduleServices.InsertInto(user, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    });
});



export const DoctorScheduleControllers = {
    InsertIntoDB
};