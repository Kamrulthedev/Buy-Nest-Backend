"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (payload, secret, expiresIn) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { algorithm: "HS256", expiresIn });
    return token;
};
exports.generateToken = generateToken;
const VerifyToken = (Token, secret) => {
    return jsonwebtoken_1.default.verify(Token, secret);
};
exports.VerifyToken = VerifyToken;
