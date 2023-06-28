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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnect_1 = require("./config/dbConnect");
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3500;
const app = new app_1.default(PORT);
const initServer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    app.listen();
    const example = {
        "name": "Neo",
        "color": "red&amber",
        "tail_length": 22,
        "weight": 32
    };
    const neo = yield ((_b = dbConnect_1.db.dog) === null || _b === void 0 ? void 0 : _b.create(example));
    console.log('NEO: ', neo);
});
initServer();
