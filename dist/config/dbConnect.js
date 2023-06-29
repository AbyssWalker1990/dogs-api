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
exports.initialize = void 0;
const tedious_1 = require("tedious");
const dbConfig_1 = __importDefault(require("./dbConfig"));
const initialScript_1 = __importDefault(require("./initialScript"));
const Sequelize_1 = __importDefault(require("./Sequelize"));
const Dog_1 = __importDefault(require("../models/Dog"));
const HttpException_1 = __importDefault(require("../exeptions/HttpException"));
const { dbName, dbConfig } = dbConfig_1.default;
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        ensureDbExists(dbName);
        yield Dog_1.default.sync({ alter: true });
        yield Sequelize_1.default.sync({ alter: true });
        yield (0, initialScript_1.default)();
    });
}
exports.initialize = initialize;
function ensureDbExists(dbName) {
    const query = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
    const connection = new tedious_1.Connection(dbConfig);
    const request = new tedious_1.Request(query, err => {
        if (err)
            throw new HttpException_1.default(500, err.message);
    });
    connection.connect(err => {
        if (err)
            throw new HttpException_1.default(500, err.message);
        connection.execSql(request);
    });
}
