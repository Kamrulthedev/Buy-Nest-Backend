import { Admin, Customer, Prisma, UserRole, UserStatus, Vendor } from "@prisma/client";
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
import { generateToken } from "../../../helpars/JwtHelpars";
import config from "../../config";
import { CreateCustomerResponse } from "../../Interfaces/common";
import AppError from "../../errors/AppError";
import { CreateVendorResponse } from "./user.interface";




//create-admin
const CreateAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file as UploadedFile;

  if (file) {
    const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
    req.body.profilePhoto = uploadToCloudinary?.secure_url
  }

  const data = req.body;
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const amdinCrateData = {
    name: data.name,
    email: data.email,
    contactNumber: data.contactNumber,
    profilePhoto: data.profilePhoto
  }


  const userData = {
    email: data.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
    name: data.name,
    contactNumber: data.contactNumber,
  }


  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdmindata = await transactionClient.admin.create({
      data: amdinCrateData,
    });
    return createdAdmindata;
  });

  return result;
};


//create vendor
const CreateVendor = async (req: Request): Promise<CreateVendorResponse> => {
  const file = req.files as UploadedFile[];

  if (file && file.length >= 2) {
    const [profilePhotoFile, logoFile] = file;
    const profilePhotoUrl = await Fileuploader.uploadToCloudinary(profilePhotoFile);
    const logoUrl = await Fileuploader.uploadToCloudinary(logoFile);

    req.body.profilePhoto = profilePhotoUrl?.secure_url;
    req.body.logoUrl = logoUrl?.secure_url;
  }

  const data = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists. Please use a different email.");
  }

  const vendorCreateData = {
    name: data.name,
    email: data.email,
    contactNumber: data.contactNumber,
    profilePhoto: data.profilePhoto,
    address: data.address || null,
    isDeleted: false,
  };

  const shopCreateData = {
    name: data.shopName,
    description: data.shopDescription,
    logoUrl: data.logoUrl,
    vendor: {
      connect: { email: data.email },
    },
  };

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword,
    contactNumber: data.contactNumber,
    role: UserRole.VENDOR,
    profilePhoto: data.profilePhoto,
    status: UserStatus.ACTIVE,
  };

  try {
    const result = await prisma.$transaction(async (transactionClient) => {
      const createdUser = await transactionClient.user.create({
        data: userData,
      });

      const createdVendor = await transactionClient.vendor.create({
        data: vendorCreateData,
      });

      const createdShop = await transactionClient.shop.create({
        data: shopCreateData,
      });

      return {
        createdUser: createdUser,
        createdVendor: createdVendor,
        createdShop: createdShop,
      };
    });

    return result
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw new Error("Failed to create vendor.");
  }
};



const CreateCustomer = async (req: Request): Promise<any> => {
  const file = req.file as Express.Multer.File;
  if (file) {
    try {
      const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
      req.body.profilePhoto = uploadToCloudinary?.secure_url;
    } catch (error) {
      throw new Error('Error uploading profile photo');
    }
  }
  const data = req.body;
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    throw new Error('Email already in use');
  }
  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.email,
    password: hashedPassword,
    role: UserRole.CUSTOMER,
    name: data.name,
    contactNumber: data.contactNumber,
  };

  try {
    const result = await prisma.$transaction(async (transactionClient) => {
      const createdUser = await transactionClient.user.create({
        data: userData,
      });

      const customerCreateData = {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        profilePhoto: data.profilePhoto,
      };

      const createdCustomerData = await transactionClient.customer.create({
        data: customerCreateData,
      });

      return { createdCustomerData, createdUser };
    });

    // Create token
    const accessToken = generateToken(
      {
        email: result.createdCustomerData.email,
        role: result.createdCustomerData.role,
      },
      config.jwt_access_token as string,
      config.jwt_access_token_expires_in as string
    );

    return {
      accessToken,
      result: {
        id: result.createdUser.id,
        userId: result.createdCustomerData.id,
        name: result.createdCustomerData.name,
        email: result.createdCustomerData.email,
        contactNumber: result.createdCustomerData.contactNumber,
        role: result.createdUser.role,
        profilePhoto: result.createdUser.profilePhoto,
        address: result.createdCustomerData.address,
        needPasswordChange: result.createdUser.needPasswordChange,
        status: result.createdUser.status,
        isDeleted: result.createdCustomerData.isDeleted,
        createdAt: result.createdUser.createdAt,
        updatedAt: result.createdUser.updatedAt
      }

    };
  } catch (error) {
    throw new Error('Error creating customer: ');
  }
};



//Get User 
const GetAllForm = async (params: any, options: IPagination) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterValue } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  // Search Condition
  if (searchTerm) {
    andConditions.push({
      OR: UserSearchAbleFilds.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // Filter Condition
  if (Object.keys(filterValue).length > 0) {
    andConditions.push({
      AND: Object.entries(filterValue).map(([key, value]) => ({
        [key]: { equals: value },
      })),
    });
  }

  const whereCondition: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Query the database
  const result = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder
      ? { [options.sortBy]: options.sortOrder }
      : { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      vendor: true,
      customer: true,
    },
  });

  const totalCount = await prisma.user.count({ where: whereCondition });

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};



const ChangeUserStatus = async (data: { userId: string, status: UserRole }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: data.userId
    }
  })

  if (!userData) {
    throw new AppError(404, "User Not Found!")
  }

  const updateUser = await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      status: data.status as UserStatus,
    },
  });
  return updateUser
};



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


//update my Profile



const UpdateMyProfile = async (user: { email: string, role: string, status: string } | null, body: any | null, file: UploadedFile) => {
  const Upload = file as UploadedFile;
  if (Upload) {
    const uploadToCloudinary = await Fileuploader.uploadToCloudinary(file);
    body.profilePhoto = uploadToCloudinary?.secure_url;
  };

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE
    },
  })

  let UpdateInfo
  if (userInfo.role === UserRole.ADMIN) {
    UpdateInfo = await prisma.admin.update({
      where: {
        email: userInfo.email
      },
      data: body
    })
    console.log(UpdateInfo)
  }
  else if (userInfo.role === UserRole.VENDOR) {
    UpdateInfo = await prisma.vendor.update({
      where: {
        email: userInfo.email
      },
      data: body
    })
  }
  else if (userInfo.role === UserRole.CUSTOMER) {
    UpdateInfo = await prisma.customer.update({
      where: {
        email: userInfo.email
      },
      data: body
    })
  }

  return { ...UpdateInfo }
};


const DeleteUser = async (data: { userId: string }) => {

  if (!data.userId) {
    throw new AppError(402, "UserId Must be")
  }

  try {
    const userInfo = await prisma.user.findUniqueOrThrow({
      where: {
        id: data.userId,
      },
    });

    // Begin the transaction
    const result = await prisma.$transaction(async (transactionClient) => {
      let DeleteInfo;

      if (userInfo.role === UserRole.ADMIN) {
        DeleteInfo = await transactionClient.admin.delete({
          where: {
            email: userInfo.email,
          },
        });
      } else if (userInfo.role === UserRole.VENDOR) {
        DeleteInfo = await transactionClient.vendor.delete({
          where: {
            email: userInfo.email,
          },
        });
      } else if (userInfo.role === UserRole.CUSTOMER) {
        DeleteInfo = await transactionClient.customer.delete({
          where: {
            email: userInfo.email,
          },
        });
      }

      const deleteUser = await transactionClient.user.delete({
        where: {
          email: userInfo.email,
        },
      });

      return deleteUser;
    });

    return result;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};


export const UserServices = {
  CreateAdmin,
  CreateVendor,
  CreateCustomer,
  GetAllForm,
  ChangeUserStatus,
  // GetMyProfile,
  UpdateMyProfile,
  DeleteUser
};
