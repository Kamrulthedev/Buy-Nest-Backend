import { z } from "zod";


const CreateSpecialties = z.object({
    title: z.string({required_error : "Title Is required!"})
});


export const SpecialtiesValidation = {
    CreateSpecialties
};