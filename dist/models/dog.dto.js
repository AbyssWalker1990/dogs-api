"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
class DogDTO {
    constructor(username, password, tail_length, weight) {
        this.name = username;
        this.color = password;
        this.tail_length = tail_length;
        this.weight = weight;
    }
}
__decorate([
    (0, class_validator_1.MinLength)(2, {
        message: 'Name must contains at least 2 symbols'
    }),
    (0, class_validator_1.IsString)()
], DogDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsString)()
], DogDTO.prototype, "color", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, {
        message: 'Tail must be positive number'
    })
], DogDTO.prototype, "tail_length", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, {
        message: 'weight must be positive number'
    })
], DogDTO.prototype, "weight", void 0);
exports.default = DogDTO;
