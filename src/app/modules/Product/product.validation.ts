import { Category } from "@prisma/client";
import { object, z } from "zod";


const categoryValues = Object.values(Category) as [string, ...string[]];


//Create Vendor & Shop Validation Schema
const CreateProductValidation = z.object({
    shopId: z.string({required_error: "Shop Id Is required!"}),
    name: z.string({ required_error: "Product name is required!" }),
    imageUrl: z.string().optional(),
    stock: z.number({ required_error: "Stock quantity is required!" }).min(0, "Stock cannot be negative!"),
    discount: z.number().optional(),
    price: z.number({ required_error: "Price is required!" }).min(0, "Price must be greater than or equal to 0!"),
    description: z.string({ required_error: "Description is required!" }),
    category: z.enum(categoryValues, { required_error: "Category is required!" }),
});


export const ProductValidation = {
    CreateProductValidation,

};