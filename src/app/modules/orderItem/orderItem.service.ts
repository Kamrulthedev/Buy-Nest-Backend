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
        // Create the new order
        const result = await prisma.orderItem.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
                price: price
            }
        });
        return result;

    } catch (error: any) {
        console.error("Error creating order:", error.message);
        throw new Error("Failed to create the order. Please try again later.");
    }
};



const GetUserOrdersItems = async (id: string) => {
    const OrderData: any = await prisma.order.findMany({
        where: {
            userId: id
        }
    });

    const result = await prisma.orderItem.findMany({
        where: {
            orderId: OrderData?.id
        }
    })
    return result;
};



export const OrderItemServices = {
    CreateOrderItem,
    GetUserOrdersItems
};