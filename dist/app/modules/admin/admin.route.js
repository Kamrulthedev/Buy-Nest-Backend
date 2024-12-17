"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controllar_1 = require("./admin.controllar");
const validateRequest_1 = require("../../middlewares/validateRequest");
const admin_validation_1 = require("./admin.validation");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/admins", (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controllar_1.AdminControllars.GetAdminsDB);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controllar_1.AdminControllars.GetByIdDB);
router.patch("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), (0, validateRequest_1.validateRequest)(admin_validation_1.ValidationWithZod.UpdateValidation), admin_controllar_1.AdminControllars.UpdateAdminDB);
router.delete("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN), admin_controllar_1.AdminControllars.DeleteFromAdminDB);
exports.AdminRoutes = router;
