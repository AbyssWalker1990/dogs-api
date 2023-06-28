"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dbOptions = {
    "dbName": "dogs",
    "dbConfig": {
        "server": "mssql",
        "options": {
            "port": 1433,
            "trustServerCertificate": true
        },
        "authentication": {
            "type": "default",
            "options": {
                "userName": "sa",
                "password": "StrongPass#123"
            }
        }
    }
};
exports.default = dbOptions;
