"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalerrorHendlar_1 = require("./app/middlewares/globalerrorHendlar");
const notFound_1 = require("./app/middlewares/notFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
// app.use(cors({ origin: ["https://buy-nest-delta.vercel.app"], credentials: true }));
app.use((0, cookie_parser_1.default)());
//use parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Welcome Buy Nest Server....");
});
app.use("/api/v1", routes_1.default);
app.use(globalerrorHendlar_1.globalErrorHendlar);
app.use(notFound_1.notFount);
exports.default = app;
