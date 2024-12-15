"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controllar_1 = require("./user.controllar");
const auth_1 = require("../../middlewares/auth");
const client_1 = require("@prisma/client");
const fileUploads_1 = require("../../../helpars/fileUploads");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/all-users', (0, auth_1.auth)(client_1.UserRole.ADMIN), user_controllar_1.UserControllars.GetAllFormDB);
// router.get('/me', auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT), UserControllars.GetMyProfileSQ);
router.patch("/update-me", (0, auth_1.auth)(client_1.UserRole.ADMIN, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.UpdateUser.parse(JSON.parse(req.body.data));
    return user_controllar_1.UserControllars.UpdateMyProfileDB(req, res, next);
});
router.post("/create-admin", (0, auth_1.auth)(client_1.UserRole.ADMIN), fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.createAdmin.parse(JSON.parse(req.body.data));
    return user_controllar_1.UserControllars.CreateAdminDB(req, res, next);
});
router.post("/create-vendor", (0, auth_1.auth)(client_1.UserRole.ADMIN), fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.CreateVendorValidation.parse(JSON.parse(req.body.data));
    return user_controllar_1.UserControllars.CreateVendorDB(req, res, next);
});
router.post("/create-customer", fileUploads_1.Fileuploader.upload.single('file'), (req, res, next) => {
    req.body = user_validation_1.UserValidation.CreateCustomer.parse(JSON.parse(req.body.data));
    return user_controllar_1.UserControllars.CreateCustomerDB(req, res, next);
});
router.patch('/change-status', (0, auth_1.auth)(client_1.UserRole.ADMIN), user_controllar_1.UserControllars.ChangeUserStatusDB);
router.delete('/delete-user', (0, auth_1.auth)(client_1.UserRole.ADMIN), user_controllar_1.UserControllars.DeleteUserDB);
exports.UserRoutes = router;
