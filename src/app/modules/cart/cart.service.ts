import { prisma } from "../../../shared/SharedPrisma";


const CreateCart = async (data: { customerId: string }) => {
    const { customerId } = data;

    // Check if a cart already exists for the customer
    const existingCart = await prisma.cart.findFirst({
        where: { customerId: customerId },
    });

    if (existingCart) throw new Error("Cart already exists for this customer!");

    // Create the cart
    const result = await prisma.cart.create({
        data: {
            customerId: customerId
        },
        include: {
            customer: true
        }
    });

    return result;
};



export const CartssServices = {
    CreateCart
};