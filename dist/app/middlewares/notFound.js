"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFount = void 0;
const notFount = (req, res, next) => {
    console.log(req);
    res.status(500).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            error: "Your Requested Path Not Found"
        }
    });
};
exports.notFount = notFount;
