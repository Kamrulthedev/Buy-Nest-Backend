"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const vendor_controllar_1 = require("./vendor.controllar");
const router = express_1.default.Router();
router.get("/all-vendors", (0, auth_1.auth)(client_1.UserRole.ADMIN), vendor_controllar_1.VendorsControllars.GetAllVendorsDB);
router.get("/:id", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), vendor_controllar_1.VendorsControllars.GetByIdVendorsDB);
// router.patch("/update/:id", DoctorsControllars.UpdateDoctorsDB);
// router.delete("/delete/:id",auth(UserRole.ADMIN), DoctorsControllars.DeleteDoctorDB);
// router.delete("/softDelete/:id",auth(UserRole.ADMIN), DoctorsControllars.SoftDeleteDoctorsDB);
exports.VendorsRoutes = router;
