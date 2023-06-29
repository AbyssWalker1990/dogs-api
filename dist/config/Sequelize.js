"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfig_1 = __importDefault(require("./dbConfig"));
const sequelize_1 = require("sequelize");
const { dbName, dbConfig } = dbConfig_1.default;
const dialect = 'mssql';
const host = dbConfig.server;
const { userName, password } = dbConfig.authentication.options;
const sequelize = new sequelize_1.Sequelize(dbName, userName, password, { host, dialect });
exports.default = sequelize;
