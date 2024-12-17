import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { CustomerSearchableFields } from "./customer.constent";
import { CustomerServices } from "./customer.service";



const GetAllCustomerDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, CustomerSearchableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CustomerServices.GetAllCustomer(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Customer retrieval successfully',
    meta: result.meta,
    data: result.data,
  });
});


const GetByIdCustomerDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CustomerServices.GetByIdFrom(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Patient retrieval successfully',
    data: result,
  });
});


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


export const CustomerControllers = {
    GetAllCustomerDB,
    GetByIdCustomerDB
};