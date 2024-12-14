import { UserServices } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import { pick } from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { UserFilterableFields } from "./user.constant";

const CreateAdminDB = catchAsync(async (req, res) => {
  const result = await UserServices.CreateAdmin(req);
  res.status(200).json({
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});


const CreateVendorSDB = catchAsync(async (req, res) => {
  const result = await UserServices.CreateVendor(req);
  res.status(200).json({
    success: true,
    message: "Vendor Created Successfully!",
    data: result,
  });
});


// const CreatePatientSQ = catchAsync(async (req, res) => {
//   const result = await UserServices.CreatePatient(req)
//   res.status(200).json({
//     success: true,
//     message: "Patient Created Usccessfully!",
//     data: result
//   })
// });


// const GetAllFormSQ = catchAsync(async (req, res) => {
//   const filter = pick(req.query, UserFilterableFields);
//   const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
//   const result = await UserServices.GetAllForm(filter, options);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "User Data fetched Successfully!",
//     meta: result.meta,
//     data: result.data,
//   });
// });


// const ChangeProfileStatusSQ = catchAsync(async (req, res) => {
//   const { id } = req.params;
//   const result = await UserServices.ChangeProfileStatus(id, req.body)
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "User Status Updated Successfully!",
//     data: result
//   })
// });


// const GetMyProfileSQ = catchAsync(async (req, res) => {
//   const { user } = req;
//   const result = await UserServices.GetMyProfile(user);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "My Profile Data",
//     data: result
//   })
// });


// const UpdateMyProfileSQ = catchAsync(async (req, res) => {
//   const {user} = req;
//   const {body} : any = req;
//   const {file} = req;
//   const result = await UserServices.UpdateMyProfile(user, body, file as any | null);
//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: "Update My Profile Data",
//     data: result
//   })
// });


export const UserControllars = {
  CreateAdminDB,
  CreateVendorSDB
  // CreatePatientSQ,
  // GetAllFormSQ,
  // ChangeProfileStatusSQ,
  // GetMyProfileSQ,
  // UpdateMyProfileSQ
};
