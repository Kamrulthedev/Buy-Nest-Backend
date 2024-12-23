import { prisma } from "../../../shared/SharedPrisma";

type TOrderData = {
    TotalPrice: string;
    userId: string;
    shopId: string;
    cardId: string;
};

const CreateOrder = async (data: TOrderData): Promise<any> => {
    const { TotalPrice, userId, shopId, cardId } = data;

    try {
        const numericTotalPrice = parseFloat(TotalPrice);

        if (isNaN(numericTotalPrice)) {
            throw new Error("Invalid TotalPrice value. It must be a valid number.");
        }

        // Create the new order
        const result = await prisma.order.create({
            data: {
                userId,
                shopId,
                totalPrice: numericTotalPrice, 
            },
            include: {
                shop: true,
                user: true,
            },
        });

        // Clear cart items
        await prisma.cartItem.deleteMany({
            where: {
                cartId: cardId,
            },
        });

        return result;

    } catch (error : any) {
        console.error("Error creating order:", error.message);
        throw new Error("Failed to create the order. Please try again later.");
    }
};



const GetUserOrders = async (id: string) => {
    const result = await prisma.order.findMany({
        where: {
            userId: id,
        },
        include: {
            shop: true,
            items: true
        }
    });

    if (result.length === 0) {
        console.log("No items found for this cart.");
    }

    return result;
};



export const OrdersServices = {
    CreateOrder,
    GetUserOrders
};