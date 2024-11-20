"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), ".env")) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    PROT: process.env.USER_PROT,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    jwt_access_token_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
    jwt_refresh_token_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
};
