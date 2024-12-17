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
    const { customerId } = data;
    // Check if a cart already exists for the customer
    const existingCart = yield SharedPrisma_1.prisma.cart.findFirst({
        where: { customerId: customerId },
    });
    if (existingCart)
        throw new Error("Cart already exists for this customer!");
    // Create the cart
    const result = yield SharedPrisma_1.prisma.cart.create({
        data: {
            customerId: customerId
        },
        include: {
            customer: true
        }
    });
    return result;
});
exports.CartssServices = {
    CreateCart
};
