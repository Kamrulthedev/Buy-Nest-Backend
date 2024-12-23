import { prisma } from "../../../shared/SharedPrisma";

type TOrderItemData = {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
};

const CreateOrderItem = async (data: TOrderItemData): Promise<any> => {
    const { price, quantity, productId, orderId } = data;

    try {
        // const numericTotalPrice = parseFloat(price);

        // if (isNaN(numericTotalPrice)) {
        //     throw new Error("Invalid TotalPrice value. It must be a valid number.");
        // }

        // Create the new order
        const result = await prisma.orderItem.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
                price: price
            }
        });
        console.log(result)
        return result;

    } catch (error: any) {
        console.error("Error creating order:", error.message);
        throw new Error("Failed to create the order. Please try again later.");
    }
};



// const GetUserCartItems = async (id: string) => {
//     const result = await prisma.cartItem.findMany({
//         where: {
//             cartId: id,
//         },
//         include: {
//             product: true,
//             cart: true
//         }
//     });

//     if (result.length === 0) {
//         console.log("No items found for this cart.");
//     }

//     return result;
// };



export const OrderItemServices = {
    CreateOrderItem,
};