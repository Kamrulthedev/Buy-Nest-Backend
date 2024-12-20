import { z } from "zod";


const UpdateShop = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    logoUrl: z.string().optional()
});


export const ShopValidation = {
    UpdateShop
};