import { prisma } from "../../../shared/SharedPrisma";


const CreateCart = async (data: { userId: string; shopId: string }) => {
    const { userId, shopId } = data;
    const existingCart = await prisma.cart.findFirst({
      where: {
        userId: userId,
        shopId: shopId,
      },
    });
    if (existingCart) {
      throw new Error("Cart already exists for this customer and shop");
    }
  
    // Proceed to create the cart
    const result = await prisma.cart.create({
      data: {
        userId: userId,
        shopId: shopId,
      },
      include: {
        shop: true,
      },
    });
  
    return result;
  };
  


const DeleteCart = async (id: string) => {
    try {
        const cartData = await prisma.cart.delete({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });

        return cartData;

    } catch (error) {
        throw new Error("Failed to delete cart");
    }
};


const AllCartsGet = async () => {
    const result = await prisma.cart.findMany();
    return result
}

const USerCartsGet = async (id: string) => {
    const result = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        shop: true,
        user: true
      }
    });
    return result;
  };
  
  

export const CartssServices = {
    CreateCart,
    DeleteCart,
    AllCartsGet,
    USerCartsGet
};