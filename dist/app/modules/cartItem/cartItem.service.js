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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemServices = void 0;
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const AppError_1 = __importDefault(require("../../errors/AppError"));
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
const DeleteCartItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield SharedPrisma_1.prisma.cartItem.findFirstOrThrow({
            where: {
                id: id,
            },
        });
        const result = yield SharedPrisma_1.prisma.cartItem.delete({
            where: {
                id: id,
            },
        });
        return result;
    }
    catch (error) {
        if (error.name === 'NotFoundError') {
            throw new AppError_1.default(404, "Cart item with the provided ID not found.");
        }
        throw new AppError_1.default(500, "An unexpected error occurred.");
    }
});
exports.CartItemServices = {
    CreateCartItem,
    GetUserCartItems,
    DeleteCartItem
};
