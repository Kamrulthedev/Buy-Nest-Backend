import { Category } from "@prisma/client";
import { object, z } from "zod";


const categoryValues = Object.values(Category) as [string, ...string[]];


//Create Vendor & Shop Validation Schema
const CreateProductValidation = z.object({
    name: z.string({ required_error: "Product name is required!" }),
    imageUrl: z.string({ required_error: "Image URL is required!" }).url("Invalid URL format!"),
    stock: z.number({ required_error: "Stock quantity is required!" }).min(0, "Stock cannot be negative!"),
    discount: z.number().optional(),
    price: z.number({ required_error: "Price is required!" }).min(0, "Price must be greater than or equal to 0!"),
    description: z.string({ required_error: "Description is required!" }).min(10, "Description must be at least 10 characters!"),
    category: z.enum(categoryValues, { required_error: "Category is required!" }),
});


export const ProductValidation = {

    CreateProductValidation,

};