"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const fileUploads_1 = require("../../../helpars/fileUploads");
const paginationHelper_1 = require("../../../helpars/paginationHelper");
const user_constant_1 = require("./user.constant");
const JwtHelpars_1 = require("../../../helpars/JwtHelpars");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
//create-admin
const CreateAdmin = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploads_1.Fileuploader.uploadToCloudinary(file);
        req.body.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    const data = req.body;
    const hashedPassword = yield bcrypt.hash(data.password, 12);
    const amdinCrateData = {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        profilePhoto: data.profilePhoto
    };
    const userData = {
        email: data.email,
        password: hashedPassword,
        role: client_1.UserRole.ADMIN,
        name: data.name,
        contactNumber: data.contactNumber,
    };
    const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transactionClient.user.create({
            data: userData,
        });
        const createdAdmindata = yield transactionClient.admin.create({
            data: amdinCrateData,
        });
        return createdAdmindata;
    }));
    return result;
});
//create vendor
const CreateVendor = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.files;
    if (file && file.length >= 2) {
        const [profilePhotoFile, logoFile] = file;
        const profilePhotoUrl = yield fileUploads_1.Fileuploader.uploadToCloudinary(profilePhotoFile);
        const logoUrl = yield fileUploads_1.Fileuploader.uploadToCloudinary(logoFile);
        req.body.profilePhoto = profilePhotoUrl === null || profilePhotoUrl === void 0 ? void 0 : profilePhotoUrl.secure_url;
        req.body.logoUrl = logoUrl === null || logoUrl === void 0 ? void 0 : logoUrl.secure_url;
    }
    const data = req.body;
    const existingUser = yield SharedPrisma_1.prisma.user.findUnique({
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
    const hashedPassword = yield bcrypt.hash(data.password, 12);
    const userData = {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        contactNumber: data.contactNumber,
        role: client_1.UserRole.VENDOR,
        profilePhoto: data.profilePhoto,
        status: client_1.UserStatus.ACTIVE,
    };
    try {
        const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield transactionClient.user.create({
                data: userData,
            });
            const createdVendor = yield transactionClient.vendor.create({
                data: vendorCreateData,
            });
            const createdShop = yield transactionClient.shop.create({
                data: shopCreateData,
            });
            return {
                createdUser: createdUser,
                createdVendor: createdVendor,
                createdShop: createdShop,
            };
        }));
        return result;
    }
    catch (error) {
        console.error("Error creating vendor:", error);
        throw new Error("Failed to create vendor.");
    }
});
const CreateCustomer = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        try {
            const uploadToCloudinary = yield fileUploads_1.Fileuploader.uploadToCloudinary(file);
            req.body.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
        }
        catch (error) {
            throw new Error('Error uploading profile photo');
        }
    }
    const data = req.body;
    // Check if email already exists
    const existingUser = yield SharedPrisma_1.prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const hashedPassword = yield bcrypt.hash(data.password, 12);
    const userData = {
        email: data.email,
        password: hashedPassword,
        role: client_1.UserRole.CUSTOMER,
        name: data.name,
        contactNumber: data.contactNumber,
    };
    try {
        const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield transactionClient.user.create({
                data: userData,
            });
            const customerCreateData = {
                name: data.name,
                email: data.email,
                contactNumber: data.contactNumber,
                profilePhoto: data.profilePhoto,
            };
            const createdCustomerData = yield transactionClient.customer.create({
                data: customerCreateData,
            });
            return { createdCustomerData, createdUser };
        }));
        // Create token
        const accessToken = (0, JwtHelpars_1.generateToken)({
            email: result.createdCustomerData.email,
            role: result.createdCustomerData.role,
        }, config_1.default.jwt_access_token, config_1.default.jwt_access_token_expires_in);
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
    }
    catch (error) {
        throw new Error('Error creating customer: ');
    }
});
//Get User 
const GetAllForm = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = params, filterValue = __rest(params, ["searchTerm"]);
    const andConditions = [];
    // Search Condition
    if (searchTerm) {
        andConditions.push({
            OR: user_constant_1.UserSearchAbleFilds.map((field) => ({
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
    const whereCondition = andConditions.length > 0 ? { AND: andConditions } : {};
    // Query the database
    const result = yield SharedPrisma_1.prisma.user.findMany({
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
    const totalCount = yield SharedPrisma_1.prisma.user.count({ where: whereCondition });
    return {
        meta: {
            page,
            limit,
            total: totalCount,
        },
        data: result,
    };
});
const ChangeUserStatus = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield SharedPrisma_1.prisma.user.findUniqueOrThrow({
        where: {
            id: data.userId
        }
    });
    if (!userData) {
        throw new AppError_1.default(404, "User Not Found!");
    }
    const updateUser = yield SharedPrisma_1.prisma.user.update({
        where: {
            id: data.userId,
        },
        data: {
            status: data.status,
        },
    });
    return updateUser;
});
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
const UpdateMyProfile = (user, body, file) => __awaiter(void 0, void 0, void 0, function* () {
    const Upload = file;
    if (Upload) {
        const uploadToCloudinary = yield fileUploads_1.Fileuploader.uploadToCloudinary(file);
        body.profilePhoto = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    ;
    const userInfo = yield SharedPrisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
            status: client_1.UserStatus.ACTIVE
        },
    });
    let UpdateInfo;
    if (userInfo.role === client_1.UserRole.ADMIN) {
        UpdateInfo = yield SharedPrisma_1.prisma.admin.update({
            where: {
                email: userInfo.email
            },
            data: body
        });
        console.log(UpdateInfo);
    }
    else if (userInfo.role === client_1.UserRole.VENDOR) {
        UpdateInfo = yield SharedPrisma_1.prisma.vendor.update({
            where: {
                email: userInfo.email
            },
            data: body
        });
    }
    else if (userInfo.role === client_1.UserRole.CUSTOMER) {
        UpdateInfo = yield SharedPrisma_1.prisma.customer.update({
            where: {
                email: userInfo.email
            },
            data: body
        });
    }
    return Object.assign({}, UpdateInfo);
});
const DeleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.userId) {
        throw new AppError_1.default(402, "UserId Must be");
    }
    try {
        const userInfo = yield SharedPrisma_1.prisma.user.findUniqueOrThrow({
            where: {
                id: data.userId,
            },
        });
        // Begin the transaction
        const result = yield SharedPrisma_1.prisma.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
            let DeleteInfo;
            if (userInfo.role === client_1.UserRole.ADMIN) {
                DeleteInfo = yield transactionClient.admin.delete({
                    where: {
                        email: userInfo.email,
                    },
                });
            }
            else if (userInfo.role === client_1.UserRole.VENDOR) {
                DeleteInfo = yield transactionClient.vendor.delete({
                    where: {
                        email: userInfo.email,
                    },
                });
            }
            else if (userInfo.role === client_1.UserRole.CUSTOMER) {
                DeleteInfo = yield transactionClient.customer.delete({
                    where: {
                        email: userInfo.email,
                    },
                });
            }
            const deleteUser = yield transactionClient.user.delete({
                where: {
                    email: userInfo.email,
                },
            });
            return deleteUser;
        }));
        return result;
    }
    catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Failed to delete user");
    }
});
exports.UserServices = {
    CreateAdmin,
    CreateVendor,
    CreateCustomer,
    GetAllForm,
    ChangeUserStatus,
    // GetMyProfile,
    UpdateMyProfile,
    DeleteUser
};
