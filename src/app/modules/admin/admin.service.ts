import { Prisma, PrismaClient } from "@prisma/client";
import { adminSearchAvleFields } from "./admin.constent";

const prisma = new PrismaClient();

const GetAdmins = async (params: any) => {
    const {searchTram, ...filterValue} = params;
  const andCondions: Prisma.AdminWhereInput[] = [];


  if (params.searchTram) {
    andCondions.push({
      OR: adminSearchAvleFields.map((field) => ({
        [field]: {
          contains: params.searchTram,
          mode: "insensitive",
        },
      })),
    });
  };

  if(Object.keys(filterValue).length > 0){
    andCondions.push({
        AND : Object.keys(filterValue).map(kay =>({
            [kay]: {
                equals : filterValue[kay]
            }
        }))
    })
  };


  const whereCondition: Prisma.AdminWhereInput = { AND: andCondions };
  const result = await prisma.admin.findMany({
    where: whereCondition,
  });
  return result;
};

export const AdminServices = {
  GetAdmins,
};
