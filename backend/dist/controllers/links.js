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
const linksRepository_1 = __importDefault(require("../models/linksRepository"));
const linksRepository_2 = __importDefault(require("../models/linksRepository"));
function generateCode() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz0123456789";
    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function getLink(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = request.params.code;
        const link = yield linksRepository_2.default.findByCode(code);
        if (!link) {
            response.sendStatus(404);
        }
        else {
            response.json(link);
        }
    });
}
function postLink(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = request.body;
        link.code = generateCode();
        link.hits = 0;
        const result = yield linksRepository_1.default.add(link);
        if (!result.id)
            return response.sendStatus(400);
        link.id = result.id;
        response.status(201).json(link);
    });
}
function hitLink(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const code = request.params.code;
        const link = yield linksRepository_2.default.hit(code);
        if (!link) {
            response.sendStatus(404);
        }
        else {
            response.json(link);
        }
    });
}
exports.default = { getLink, postLink, hitLink };
