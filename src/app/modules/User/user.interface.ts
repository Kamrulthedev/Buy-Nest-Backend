import { UserRole, UserStatus, Vendor } from "@prisma/client";

export interface CreateVendorResponse {
    createdUser: {
      name: string;
      id: string;
      email: string;
      role: UserRole;
      profilePhoto: string | null;
      contactNumber: string;
      createdAt: Date;
      updatedAt: Date;
      password: string;
      needPasswordChange: boolean;
      status: UserStatus;
      lastLogin: Date | null;
    };
    createdVendor: Vendor;
    createdShop: any; 
  }