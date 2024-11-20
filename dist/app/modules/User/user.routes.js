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
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllar_1 = require("./user.controllar");
const JwtHelpars_1 = require("../../../helpars/JwtHelpars");
const config_1 = __importDefault(require("../../config"));
const router = express_1.default.Router();
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new Error("You are Not Authorized!");
            }
            const verifiedUser = (0, JwtHelpars_1.VerifyToken)(token, config_1.default.jwt_refresh_token);
            console.log(verifiedUser);
        }
        catch (error) {
            next(error);
        }
    });
};
router.post("/create-admin", auth("ADMIN", "SUPER_ADMIN"), user_controllar_1.UserControllars.CreateAdminSQ);
exports.UserRoutes = router;
