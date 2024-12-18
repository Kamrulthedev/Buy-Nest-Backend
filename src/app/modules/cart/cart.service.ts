import { prisma } from "../../../shared/SharedPrisma";


const CreateCart = async (data: { userId: string, shopId: string }) => {
    const { userId, shopId } = data;
    const existingCart = await prisma.cart.findFirst({
        where: {
            userId: userId,
            shopId: shopId
        },
    });

    if (existingCart) throw new Error("Cart already exists for this customer and shop!");

    const result = await prisma.cart.create({
        data: {
            userId: userId,
            shopId: shopId
        },
        include: {
            shop: true
        }
    });

    return result;
};




export const CartssServices = {
    CreateCart
};