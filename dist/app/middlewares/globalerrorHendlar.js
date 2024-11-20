"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHendlar = void 0;
const globalErrorHendlar = (err, req, res, next) => {
    res.status(200).json({
        success: false,
        message: err.message || "Someting Went Wrong!",
        error: err
    });
};
exports.globalErrorHendlar = globalErrorHendlar;
