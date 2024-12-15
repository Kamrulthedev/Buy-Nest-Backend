// import { Request, Response } from 'express';
// import { catchAsync } from '../../../shared/catchAsync';
// import { pick } from '../../../shared/pick';
// import { patientFilterableFields } from './patient.constent';
// import sendResponse from '../../../shared/sendResponse';
// import { PatientServices } from './patient.service';


// const GetAllFromDB = catchAsync(async (req: Request, res: Response) => {
//   const filters = pick(req.query, patientFilterableFields);
//   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
//   const result = await PatientServices.GetAllFrom(filters, options);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient retrieval successfully',
//     meta: result.meta,
//     data: result.data,
//   });
// });


// const GetByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.GetByIdFrom(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient retrieval successfully',
//     data: result,
//   });
// });


// const UpdateIntoDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.UpdateInto(id, req.body);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient updated successfully',
//     data: result,
//   });
// });

// const DeleteFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.DeleteFrom(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient deleted successfully',
//     data: result,
//   });
// });


// const SoftDeleteDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await PatientServices.SoftDelete(id);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Patient soft deleted successfully',
//     data: result,
//   });
// });


// export const PatientControllers = {
//   GetAllFromDB,
//   GetByIdFromDB,
//   UpdateIntoDB,
//   DeleteFromDB,
//   SoftDeleteDB
// };