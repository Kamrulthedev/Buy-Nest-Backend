import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { prisma } from "../../../shared/SharedPrisma";
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


const GetMyScheduleDB = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['startDate', 'endDate', 'isBooked']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = req.user;
    const result = await DoctorScheduleServices.GetMySchedule(filters, options, user);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "My Schedule fetched successfully!",
        data: result
    });
});


const DeleteDoctorSchedule = catchAsync(async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const result = await DoctorScheduleServices.DeleteDoctorSchedule(user, id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "My Schedule deleted successfully!",
        data: result
    });
});


export const DoctorScheduleControllers = {
    InsertIntoDB,
    GetAllFromDB,
    GetMyScheduleDB,
    DeleteDoctorSchedule
};
