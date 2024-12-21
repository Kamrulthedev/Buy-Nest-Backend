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
exports.CartssServices = void 0;
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const CreateCart = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, shopId } = data;
    const existingCart = yield SharedPrisma_1.prisma.cart.findFirst({
        where: {
            userId: userId,
            shopId: shopId,
        },
    });
    if (existingCart) {
        throw new Error("Cart already exists for this customer and shop");
    }
    // Proceed to create the cart
    const result = yield SharedPrisma_1.prisma.cart.create({
        data: {
            userId: userId,
            shopId: shopId,
        },
        include: {
            shop: true,
        },
    });
    return result;
});
const DeleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = yield SharedPrisma_1.prisma.cart.delete({
            where: {
                id,
            },
            include: {
                items: true,
            },
        });
        return cartData;
    }
    catch (error) {
        throw new Error("Failed to delete cart");
    }
});
const AllCartsGet = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.cart.findMany();
    return result;
});
const USerCartsGet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SharedPrisma_1.prisma.cart.findMany({
        where: {
            userId: id,
        },
        include: {
            shop: true,
            user: true
        }
    });
    return result;
});
exports.CartssServices = {
    CreateCart,
    DeleteCart,
    AllCartsGet,
    USerCartsGet
};
