"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const JwtHelpars_1 = require("../../../helpars/JwtHelpars");
const SharedPrisma_1 = require("../../../shared/SharedPrisma");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield SharedPrisma_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: client_1.UserStatus.ACTIVE
        },
    });
    // Ensure both passwords are strings
    if (typeof payload.password !== "string" ||
        typeof userData.password !== "string") {
        throw new Error("Invalid password or user data format");
    }
    const isCorrectPassword = yield bcrypt.compare(payload.password, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Invalid password");
    }
    //create token
    const accessToken = (0, JwtHelpars_1.generateToken)({
        email: userData.email,
        role: userData.role,
        status: userData.status,
    }, config_1.default.jwt_access_token, config_1.default.jwt_access_token_expires_in);
    const refreshToken = (0, JwtHelpars_1.generateToken)({
        email: userData.email,
        role: userData.role,
        status: userData.status,
    }, config_1.default.jwt_refresh_token, config_1.default.jwt_refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
        needPasswordChange: userData.needPasswordChange,
    };
});
//create refresh Token
const RefreshToken = (Token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = (0, JwtHelpars_1.VerifyToken)(Token, config_1.default.jwt_refresh_token_expires_in);
    }
    catch (err) {
        throw new Error("You are not authorized!");
    }
    // Validate decoded data before querying
    if (!decodedData || typeof decodedData !== "object" || !decodedData.email) {
        throw new Error("Invalid token payload");
    }
    try {
        const userData = yield SharedPrisma_1.prisma.user.findUniqueOrThrow({
            where: {
                email: decodedData.email,
                status: client_1.UserStatus.ACTIVE
            },
        });
        if (!userData) {
            throw new Error("User not found");
        }
        const accessToken = (0, JwtHelpars_1.generateToken)({
            email: userData.email,
            role: userData.role,
            status: userData.status,
        }, config_1.default.jwt_access_token, config_1.default.jwt_access_token_expires_in);
        return {
            accessToken,
            needPasswordChange: userData.needPasswordChange,
        };
    }
    catch (err) {
        throw new Error("Could not verify user");
    }
});
exports.AuthService = {
    loginUser,
    RefreshToken,
};
