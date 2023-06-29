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
const express_1 = __importDefault(require("express"));
const dog_service_1 = __importDefault(require("../services/dog.service"));
const validationMiddleware_1 = __importDefault(require("../middleware/validationMiddleware"));
const dog_dto_1 = __importDefault(require("../models/dog.dto"));
class DogController {
    constructor() {
        this.path = '/dogs';
        this.router = express_1.default.Router();
        this.dogService = new dog_service_1.default();
        this.getAllDogsHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const allDogs = yield this.dogService.getDogs(req);
            res.status(200).json(allDogs);
        });
        this.createDogHandler = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const dogData = req.body;
            try {
                const createdDog = yield this.dogService.createDog(dogData);
                res.status(201).json(createdDog);
            }
            catch (error) {
                next(error);
            }
        });
        this.initRoutes();
    }
    initRoutes() {
        this.router.get(`${this.path}/`, this.getAllDogsHandler);
        this.router.post(`/dog/`, (0, validationMiddleware_1.default)(dog_dto_1.default), this.createDogHandler);
    }
}
exports.default = DogController;
