"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = __importDefault(require("../config/Sequelize"));
class Dog extends sequelize_1.Model {
}
Dog.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tail_length: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: Sequelize_1.default
});
exports.default = Dog;
