import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUser } from "../../Interfaces/common";
import { ScheduleService } from "./schedule.service";

const InserScheduleIntoDB = catchAsync(async (req, res) => {
    const result = await ScheduleService.InserScheduleInto(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});


const GetAllFromDB = catchAsync(async (req , res) => {
    const filters = pick(req.query, ['startDate', 'endDate']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const user = req.user;
    const result = await ScheduleService.GetAllFrom(filters, options, user as IAuthUser);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Schedule fetched successfully!",
        data: result
    });
});


const GetByIdFromDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleService.GetByIdFrom(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Schedule retrieval successfully',
        data: result,
    });
});


const DeleteScheduleDB = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ScheduleService.DeleteSchedule(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
});


export const ScheduleControllers = {
    GetAllFromDB,
    GetByIdFromDB,
    InserScheduleIntoDB,
    DeleteScheduleDB
}