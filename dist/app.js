"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.initMiddlewares();
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
    }
    initMiddlewares() {
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.json());
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port: ${this.port}`);
        });
    }
}
exports.default = App;
