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
exports.OrderItemServices = void 0;
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const CreateOrderItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { price, quantity, productId, orderId } = data;
    try {
        // Create the new order
        const result = yield SharedPrisma_1.prisma.orderItem.create({
            data: {
                orderId: orderId,
                productId: productId,
                quantity: quantity,
                price: price
            }
        });
        return result;
    }
    catch (error) {
        console.error("Error creating order:", error.message);
        throw new Error("Failed to create the order. Please try again later.");
    }
});
const GetUserOrdersItems = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderData = yield SharedPrisma_1.prisma.order.findMany({
        where: {
            userId: id,
        },
    });
    const result = yield SharedPrisma_1.prisma.orderItem.findMany({
        where: {
            orderId: {
                in: OrderData.map((order) => order.id),
            },
        },
        include: {
            product: {
                select: {
                    name: true,
                    id: true,
                    price: true,
                    category: true,
                    imageUrl: true,
                    shop: {
                        select: {
                            name: true
                        }
                    }
                },
            },
            order: true,
        },
    });
    return result;
});
exports.OrderItemServices = {
    CreateOrderItem,
    GetUserOrdersItems
};
