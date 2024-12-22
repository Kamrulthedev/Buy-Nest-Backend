"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersServices = void 0;
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const CreateOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { TotalPrice, userId, shopId, cardId } = data;
    try {
        const existingOrder = yield SharedPrisma_1.prisma.order.findFirst({
            where: {
                shopId,
                userId,
            },
        });
        if (existingOrder) {
            throw new Error("This order already exists.");
        }
        const numericTotalPrice = parseFloat(TotalPrice);
        if (isNaN(numericTotalPrice)) {
            throw new Error("Invalid TotalPrice value. It must be a valid number.");
        }
        // Create the new order
        const result = yield SharedPrisma_1.prisma.order.create({
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
        yield SharedPrisma_1.prisma.cartItem.deleteMany({
            where: {
                cartId: cardId,
            },
        });
        return result;
    }
    catch (error) {
        console.error("Error creating order:", error.message);
        throw new Error("Failed to create the order. Please try again later.");
    }
});
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
exports.OrdersServices = {
    CreateOrder,
};
