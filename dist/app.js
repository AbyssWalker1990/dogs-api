"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = __importDefault(require("./config/corsOptions"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
const connect_timeout_1 = __importDefault(require("connect-timeout"));
class App {
    constructor(controllers, port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddlewares();
        this.initControllers(controllers);
        this.initErrorMiddleware();
    }
    initControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    initMiddlewares() {
        this.app.use((0, connect_timeout_1.default)('8s'));
        this.app.use((0, cors_1.default)(corsOptions_1.default));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
        this.app.use(this.haltOnTimedout);
    }
    initErrorMiddleware() {
        this.app.use(errorMiddleware_1.default);
    }
    haltOnTimedout(req, res, next) {
        if (!req.timedout)
            next();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port: ${this.port}`);
        });
    }
}
exports.default = App;
