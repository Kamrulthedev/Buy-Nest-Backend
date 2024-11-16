import { z } from "zod";

const UpdateValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    contactNumber: z.string().optional(),
  }),
});


export const ValidationWithZod = {
    UpdateValidation
};