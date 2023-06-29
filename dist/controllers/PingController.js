"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class PingController {
    constructor() {
        this.path = '/ping';
        this.router = express_1.default.Router();
        this.pingHandle = (req, res, next) => {
            res.send('Dogshouseservice.Version1.0.1');
        };
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}/`, this.pingHandle);
    }
}
exports.default = PingController;
