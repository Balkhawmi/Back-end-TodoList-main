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
exports.userPostSchema = exports.verifiUsername = void 0;
const zod_1 = require("zod");
const prisma_model_1 = __importDefault(require("../../../core/impl/prisma.model"));
// Fonction pour vérifier si le nom d'utilisateur est unique
const verifiUsername = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield prisma_model_1.default.user.count({
        where: { username: value },
    });
    return count < 1;
});
exports.verifiUsername = verifiUsername;
exports.userPostSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: "Le nom d'utilisateur est obligatoire",
    })
        .min(1, "Le nom d'utilisateur ne peut pas être vide")
        .refine(exports.verifiUsername, "Le nom d'utilisateur existe déjà"),
    password: zod_1.z.string({
        required_error: "Le mot de passe est obligatoire",
    })
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});
