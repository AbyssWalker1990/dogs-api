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
exports.db = void 0;
const tedious_1 = require("tedious");
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("./dbConfig"));
const dog_1 = require("../models/dog");
const { dbName, dbConfig } = dbConfig_1.default;
exports.db = {};
initialize();
function initialize() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('triggered');
        const dialect = 'mssql';
        const host = dbConfig.server;
        const { userName, password } = dbConfig.authentication.options;
        // create db if it doesn't already exist
        yield ensureDbExists(dbName);
        // connect to db
        const sequelize = new sequelize_1.Sequelize(dbName, userName, password, { host, dialect });
        // init models and add them to the exported db object
        exports.db.dog = (0, dog_1.dog)(sequelize);
        // sync all models with database
        yield sequelize.sync({ alter: true });
        const example = {
            "name": "Neo",
            "color": "red&amber",
            "tail_length": 22,
            "weight": 32
        };
        const neo = yield ((_a = exports.db.dog) === null || _a === void 0 ? void 0 : _a.create(example));
        console.log('NEO: ', neo);
    });
}
function ensureDbExists(dbName) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const connection = new tedious_1.Connection(dbConfig);
            connection.connect((err) => {
                if (err) {
                    console.error(err);
                    reject(`Connection Failed: ${err.message}`);
                }
                const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
                const request = new tedious_1.Request(createDbQuery, (err) => {
                    if (err) {
                        console.error(err);
                        reject(`Create DB Query Failed: ${err.message}`);
                    }
                    // query executed successfully
                    resolve();
                });
                connection.execSql(request);
            });
        });
    });
}
