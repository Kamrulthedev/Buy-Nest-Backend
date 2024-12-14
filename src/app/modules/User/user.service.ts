import { Admin, Prisma, UserRole, UserStatus } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { prisma } from "../../../shared/SharedPrisma";
import { Fileuploader } from "../../../helpars/fileUploads";
import { UploadedFile } from "../../Interfaces/UploadedFileType";
import { Request } from "express";
import { IPagination } from "../../Interfaces/Pagination";
import { paginationHelper } from "../../../helpars/paginationHelper";
import { UserSearchAbleFilds } from "./user.constant";
import { resourceLimits } from "worker_threads";
import { differenceInHours } from "date-fns";


//create-admin
const CreateAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as UploadedFile;

  if (file) {
    const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url
  }

  const data = req.body;

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    password: hashedPassword,
    email: data.admin.email,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdmindata = await transactionClient.admin.create({
      data: data.admin,
    });
    return createdAdmindata;
  });

  return result;
};


// //create doctor
// const CreateDoctor = async (req: Request): Promise<Doctor> => {
//   const file = req.file as UploadedFile;

//   if (file) {
//     const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
//     req.body.doctor.profilePhoto = uploadToCloudinary?.secure_url
//   }

//   const data = req.body;

//   const hashedPassword: string = await bcrypt.hash(data.password, 12);

//   const userData = {
//     password: hashedPassword,
//     email: data.doctor.email,
//     role: UserRole.DOCTOR,
//   };

//   const result = await prisma.$transaction(async (transactionClient) => {
//     await transactionClient.user.create({
//       data: userData,
//     });

//     const createdDoctordata = await transactionClient.doctor.create({
//       data: data.doctor,
//     });
//     return createdDoctordata;
//   });

// return result

// };


// //create patient
// const CreatePatient = async (req: Request): Promise<Patient> => {
//   const file = req.file as UploadedFile;
//   if (file) {
//     const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
//     req.body.patient.profilePhoto = uploadToCloudinary?.secure_url
//   }

//   const data = req.body;

//   const hashedPassword: string = await bcrypt.hash(data.password, 12);

//   const userData = {
//     password: hashedPassword,
//     email: data.patient.email,
//     role: UserRole.PATIENT,
//   };

//   const result = await prisma.$transaction(async (transactionClient) => {
//     await transactionClient.user.create({
//       data: userData,
//     });

//     const createdDoctordata = await transactionClient.patient.create({
//       data: data.patient,
//     });
//     return createdDoctordata;
//   });

//   return result;
// };


// //Get User 
// const GetAllForm = async (params: any, options: IPagination) => {
//   const { page, limit, skip }: any = paginationHelper.calculatePagination;

//   const { searchTram, ...filterValue } = params;
//   const andCondions: Prisma.UserWhereInput[] = [];

//   if (params.searchTram) {
//     andCondions.push({
//       OR: UserSearchAbleFilds.map((field) => ({
//         [field]: {
//           contains: params.searchTram,
//           mode: "insensitive",
//         },
//       })),
//     });
//   }

//   if (Object.keys(filterValue).length > 0) {
//     andCondions.push({
//       AND: Object.keys(filterValue).map((kay) => ({
//         [kay]: {
//           equals: (filterValue as any)[kay],
//         },
//       })),
//     });
//   }

//   const whereCondition: Prisma.UserWhereInput = andCondions.length > 0 ? { AND: andCondions } : {};


//   const result = await prisma.user.findMany({
//     where: whereCondition,
//     skip: skip,
//     take: limit,
//     orderBy:
//       options.sortBy && options.orderBy
//         ? {
//           [options.sortBy]: options.sortOrder,
//         }
//         : {
//           createdAt: "desc",
//         },
//     select: {
//       id: true,
//       email: true,
//       role: true,
//       needPasswordChange: true,
//       status: true,
//       createdAt: true,
//       updatedAt: true,
//       admin: true,
//       patient: true,
//       doctor: true
//     },
//   });

//   const TotalCount = await prisma.user.count({
//     where: whereCondition,
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total: TotalCount,
//     },
//     data: result,
//   };
// };


// const ChangeProfileStatus = async (id: string, status: UserRole) => {
//   const userData = await prisma.user.findUniqueOrThrow({
//     where: {
//       id
//     }
//   })

//   const updateUser = await prisma.user.update({
//     where: {
//       id
//     },
//     data: status
//   })
//   return updateUser
// };

// const GetMyProfile = async (user: { email: string, role: string, status: string }) => {
//   const userInfo = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user.email,
//       status: UserStatus.ACTIVE
//     },
//     select: {
//       id: true,
//       email: true,
//       needPasswordChange: true,
//       role: true,
//       status: true,
//     }
//   })
//   let ProfileInfo
//   if (userInfo.role === UserRole.SUPER_ADMIN) {
//     ProfileInfo = await prisma.admin.findUnique({
//       where: {
//         email: userInfo.email
//       },
//     })
//   }
//   else if (userInfo.role === UserRole.ADMIN) {
//     ProfileInfo = await prisma.admin.findUnique({
//       where: {
//         email: userInfo.email
//       },
//     })
//   }
//   else if (userInfo.role === UserRole.DOCTOR) {
//     ProfileInfo = await prisma.doctor.findUnique({
//       where: {
//         email: userInfo.email
//       },
//     })
//   }
//   else if (userInfo.role === UserRole.PATIENT) {
//     ProfileInfo = await prisma.patient.findUnique({
//       where: {
//         email: userInfo.email
//       },
//     })
//   }
//   return { ...userInfo, ...ProfileInfo }
// };

// //update my Profile
// const UpdateMyProfile = async(user : {email : string, role: string, status: string} | null, body: any | null, file : UploadedFile) =>{
//   const Upload = file as UploadedFile;
//   if(Upload){
//    const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
//    body.profilePhoto = uploadToCloudinary?.secure_url;
//   };

//   const userInfo = await prisma.user.findUniqueOrThrow({
//     where: {
//       email: user?.email,
//       status: UserStatus.ACTIVE
//     },
//   })
//   let UpdateInfo
//   if (userInfo.role === UserRole.SUPER_ADMIN) {
//     UpdateInfo = await prisma.admin.update({
//       where: {
//         email: userInfo.email
//       },
//       data : body
//     })
//   }
//   else if (userInfo.role === UserRole.ADMIN) {
//     UpdateInfo = await prisma.admin.update({
//       where: {
//         email: userInfo.email
//       },
//       data : body
//     })
//   }
//   else if (userInfo.role === UserRole.DOCTOR) {
//     UpdateInfo = await prisma.doctor.update({
//       where: {
//         email: userInfo.email
//       },
//       data : body
//     })
//   }
//   else if (userInfo.role === UserRole.PATIENT) {
//     UpdateInfo = await prisma.patient.update({
//       where: {
//         email: userInfo.email
//       },
//       data: body
//     })
//   }
//   return {...UpdateInfo }
// };



export const UserServices = {
  CreateAdmin,
  // CreateDoctor,
  // CreatePatient,
  // GetAllForm,
  // ChangeProfileStatus,
  // GetMyProfile,
  // UpdateMyProfile
};
