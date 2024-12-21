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
exports.CartItemServices = void 0;
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const CreateCartItem = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, cartId } = data;
    const existingCart = yield SharedPrisma_1.prisma.cartItem.findFirst({
        where: {
            productId: productId,
            cartId: cartId,
        },
    });
    if (existingCart) {
        throw new Error("This product is already in the cart.");
    }
    // Proceed to create the cart
    const result = yield SharedPrisma_1.prisma.cartItem.create({
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
});
const GetUserCartItems = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.cartItem.findMany({
        where: {
            cartId: id,
        },
        include: {
            product: true,
            cart: true
        }
    });
    if (result.length === 0) {
        console.log("No items found for this cart.");
    }
    return result;
});
exports.CartItemServices = {
    CreateCartItem,
    GetUserCartItems
};
