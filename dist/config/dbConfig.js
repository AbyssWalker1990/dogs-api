"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbName = process.env.DB_NAME;
const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;
const dbOptions = {
    dbName: dbName,
    dbConfig: {
        server: server,
        options: {
            port: 1433,
            trustServerCertificate: true
        },
        authentication: {
            type: "default",
            options: {
                userName: userName,
                password: password
            }
        }
    }
};
exports.default = dbOptions;
