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
const HttpException_1 = __importDefault(require("../exeptions/HttpException"));
const Dog_1 = __importDefault(require("../models/Dog"));
const dog_service_interface_1 = require("../interfaces/dog.service.interface");
class DogService {
    constructor() {
        this.createDog = (dogData) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createdDog = yield Dog_1.default.create(dogData);
                return createdDog;
            }
            catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError')
                    throw new HttpException_1.default(409, 'Name of Dog must be unique!');
                throw new HttpException_1.default(400, error.message);
            }
        });
        this.getDogs = (req) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const params = {
                pageNumber: (_a = Number(req.query.pageNumber)) !== null && _a !== void 0 ? _a : 1,
                pageSize: (_b = Number(req.query.pageSize)) !== null && _b !== void 0 ? _b : 10,
                attribute: (_c = req.query.attribute) !== null && _c !== void 0 ? _c : dog_service_interface_1.Attribute.createdAt,
                order: (_d = req.query.order) !== null && _d !== void 0 ? _d : dog_service_interface_1.Order.desc
            };
            const sortedDogs = yield this.sortAndPaginate(params);
            return sortedDogs;
        });
        this.sortAndPaginate = (params) => __awaiter(this, void 0, void 0, function* () {
            const { pageNumber, pageSize, attribute, order } = params;
            const limit = pageSize;
            const offset = (pageNumber - 1) * pageSize;
            const dogs = yield Dog_1.default.findAll({
                limit,
                offset,
                order: [[attribute, order]],
                where: {}
            });
            return dogs;
        });
    }
}
exports.default = DogService;
