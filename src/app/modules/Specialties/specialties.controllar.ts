import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SpecialtiesServices } from "./specialties.service";

const InsertIntoDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.InsertInto()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialties Insert Successfully!",
    data: result
  });
});


export const SpecialtiesControllars = {
  InsertIntoDB
};
