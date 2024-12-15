import { Customer, UserRole } from "@prisma/client";

export type IAuthUser = {
    email: string;
    role: UserRole
} | null;


//create Customer
export interface CreateCustomerResponse {
    result: Customer;
    accessToken: string;
  }