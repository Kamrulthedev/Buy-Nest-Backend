import { prisma } from "../../../shared/SharedPrisma";



const CreateCartItem = async (data: { productId: string; cartId: string }) => {
    const { productId, cartId } = data;
    const existingCart = await prisma.cartItem.findFirst({
        where: {
            productId: productId,
            cartId: cartId,
        },
    });
    if (existingCart) {
        throw new Error("This product is already in the cart.");
    }

    // Proceed to create the cart
    const result = await prisma.cartItem.create({
        data: {
            productId: productId,
            cartId: cartId,
        },
        include: {
            product: true,
            cart: true
        },
    });

    return result;
};


export const CartItemServices = {
    CreateCartItem
}