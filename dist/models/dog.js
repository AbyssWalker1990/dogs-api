"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dog = void 0;
const sequelize_1 = require("sequelize");
function dog(sequelize) {
    const attributes = {
        name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        color: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        tail_length: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
        weight: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
    };
    return sequelize.define('Dog', attributes);
}
exports.dog = dog;
