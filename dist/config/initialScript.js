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
Object.defineProperty(exports, "__esModule", { value: true });
const initialData_1 = __importDefault(require("./initialData"));
const Dog_1 = __importDefault(require("../models/Dog"));
const addInitialData = () => __awaiter(void 0, void 0, void 0, function* () {
    if (yield isAlreadyExists())
        return;
    initialData_1.default.map((element) => __awaiter(void 0, void 0, void 0, function* () { return yield Dog_1.default.create(element); }));
});
const isAlreadyExists = () => __awaiter(void 0, void 0, void 0, function* () { return yield Dog_1.default.findOne({ where: { name: 'Neo' } }); });
exports.default = addInitialData;
