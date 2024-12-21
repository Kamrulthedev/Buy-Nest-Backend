"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopValidation = void 0;
const zod_1 = require("zod");
const UpdateShop = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    logoUrl: zod_1.z.string().optional()
});
exports.ShopValidation = {
    UpdateShop
};
