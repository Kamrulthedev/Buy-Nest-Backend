import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { scheduleFilterableFields } from "./doctorSchedule.constent";
import { DoctorScheduleServices } from "./doctorSchedule.service";


const InsertIntoDB = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await DoctorScheduleServices.InsertInto(user, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Doctor Schedule created successfully!",
        data: result
    });
});



const GetAllFromDB = catchAsync(async (req, res) => {
    const filters = pick(req.query, scheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await DoctorScheduleServices.GetAllFrom(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Doctor Schedule retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});



export const DoctorScheduleControllers = {
    InsertIntoDB,
    GetAllFromDB
};