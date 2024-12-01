import { catchAsync } from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SpecialtiesServices } from "./specialties.service";

const InsertIntoDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.InsertInto(req)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialties Insert Successfully!",
    data: result
  });
});



const GetSpecialtiesDB = catchAsync(async (req, res) => {
  const result = await SpecialtiesServices.GetSpecialties()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "fetched Specialties Data!",
    data: result
  });
});


const GetByIdSpecialtiesDB = catchAsync(async (req, res) => {
    const {id} = req.params;
  const result = await SpecialtiesServices.GetByIdSpecialties(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "fetched Specialties Single Data!",
    data: result
  });
});


const DeleteSpecialtiesDB = catchAsync(async (req, res) => {
    const {id} = req.params;
  const result = await SpecialtiesServices.DeleteSpecialties(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Delete Specialties Data!",
    data: null
  });
});


export const SpecialtiesControllars = {
  InsertIntoDB,
  GetSpecialtiesDB,
  GetByIdSpecialtiesDB,
  DeleteSpecialtiesDB
};
