import { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { pick } from '../../../shared/pick';
import { patientFilterableFields } from './patient.constent';
import { PatientService } from './patient.service';
import sendResponse from '../../../shared/sendResponse';


const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await PatientService.GetAllFrom(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

//   const { id } = req.params;
//   const result = await PatientService.getByIdFromDB(id);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Patient retrieval successfully',
//     data: result,
//   });
// });

// const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientService.updateIntoDB(id, req.body);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Patient updated successfully',
//     data: result,
//   });
// });

// const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientService.deleteFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Patient deleted successfully',
//     data: result,
//   });
// });


// const softDelete = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientService.softDelete(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Patient soft deleted successfully',
//     data: result,
//   });
// });

export const PatientController = {
  GetAllFromDB,
//   getByIdFromDB,
//   updateIntoDB,
//   deleteFromDB,
//   softDelete,
};