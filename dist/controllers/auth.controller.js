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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JSECRET_ACCESS_TOKEN;
const JWT_EXPIRATION = process.env.JSECRET_TIME_TO_EXPIRE;
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const newUser = yield prisma.user.create({
                    data: {
                        username,
                        password: hashedPassword,
                    },
                });
                res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
            }
            catch (error) {
                console.error('Erreur lors de l\'inscription de l\'utilisateur:', error);
                res.status(500).json({ message: 'Erreur lors de l\'inscription de l\'utilisateur' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield prisma.user.findUnique({
                    where: { username },
                });
                if (!user) {
                    return res.status(401).json({ message: 'Nom d\'utilisateur incorrect' });
                }
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'Mot de passe incorrect' });
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, {
                    expiresIn: JWT_EXPIRATION,
                });
                res.status(200).json({ message: 'Connexion réussie', token });
            }
            catch (error) {
                console.error('Erreur lors de la connexion:', error);
                res.status(500).json({ message: 'Erreur lors de la connexion' });
            }
        });
    }
}
exports.AuthController = AuthController;
