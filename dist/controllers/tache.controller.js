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
exports.TacheController = void 0;
const controller_1 = __importDefault(require("../core/impl/controller"));
const prisma_model_1 = __importDefault(require("../core/impl/prisma.model"));
const response_1 = __importDefault(require("../core/response"));
const http_status_codes_1 = require("http-status-codes");
class TacheController extends controller_1.default {
    // Méthode pour créer une nouvelle tâche
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { libelle, statut, userId, etat } = req.body;
                const newTache = yield prisma_model_1.default.tache.create({
                    data: {
                        libelle,
                        statut,
                        etat,
                        userId,
                    },
                });
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(newTache, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(response_1.default.response("Erreur lors de la création de la tâche", http_status_codes_1.StatusCodes.BAD_REQUEST));
            }
        });
    }
    // Méthode pour récupérer toutes les tâches
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taches = yield prisma_model_1.default.tache.findMany({
                    where: { etat: true },
                    select: {
                        id: true,
                        libelle: true,
                        statut: true,
                        etat: true,
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                });
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(taches, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response("Tâches non trouvées", http_status_codes_1.StatusCodes.NOT_FOUND));
            }
        });
    }
    // Méthode pour récupérer une tâche par ID
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = parseInt(req.params.id);
                const tache = yield prisma_model_1.default.tache.findFirstOrThrow({
                    where: { id: tacheId },
                    select: {
                        id: true,
                        libelle: true,
                        statut: true,
                        etat: true,
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                });
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(tache, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response("Tâche non trouvée", http_status_codes_1.StatusCodes.NOT_FOUND));
            }
        });
    }
    // Méthode pour récupérer toutes les tâches d'un utilisateur à partir de son ID
    getTachesByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = Number(req.params.userId);
                if (isNaN(userId)) {
                    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send(response_1.default.response("Invalid user ID", http_status_codes_1.StatusCodes.BAD_REQUEST));
                }
                const taches = yield prisma_model_1.default.tache.findMany({
                    where: { userId,
                        etat: true
                    },
                    select: {
                        id: true,
                        libelle: true,
                        statut: true,
                        etat: true,
                        createdAt: true,
                        updatedAt: true,
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    },
                });
                if (taches.length === 0) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response("Aucune tâche trouvée pour cet utilisateur", http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                const tachesWithUsername = taches.map(tache => (Object.assign(Object.assign({}, tache), { username: tache.user.username })));
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(tachesWithUsername, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(response_1.default.response("Erreur lors de la récupération des tâches", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
            }
        });
    }
    // Méthode pour modifier une tâche ou un de ses éléments
    editTache(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = parseInt(req.params.id);
                const { libelle, statut, etat, userId } = req.body;
                const updatedTache = yield prisma_model_1.default.tache.update({
                    where: { id: tacheId },
                    data: {
                        libelle,
                        statut,
                        etat,
                        userId,
                    },
                });
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(updatedTache, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response("Erreur lors de la modification de la tâche", http_status_codes_1.StatusCodes.NOT_FOUND));
            }
        });
    }
    // Méthode pour archiver une tâche (changer son etat à false)
    archiveTache(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tacheId = parseInt(req.params.id);
                const archivedTache = yield prisma_model_1.default.tache.update({
                    where: { id: tacheId },
                    data: {
                        etat: false,
                    },
                });
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(archivedTache, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response("Erreur lors de l'archivage de la tâche", http_status_codes_1.StatusCodes.NOT_FOUND));
            }
        });
    }
    // Méthode pour filtrer les tâches par statut (complete ou incomplete)
    tacheStatut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { statut } = req.params; // statut attendu : 'complete' ou 'incomplete'
                const taches = yield prisma_model_1.default.tache.findMany({
                    where: { statut },
                    select: {
                        id: true,
                        libelle: true,
                        statut: true,
                        etat: true,
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                });
                if (taches.length === 0) {
                    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(response_1.default.response(`Aucune tâche trouvée avec le statut ${statut}`, http_status_codes_1.StatusCodes.NOT_FOUND));
                }
                res.status(http_status_codes_1.StatusCodes.OK).send(response_1.default.response(taches, http_status_codes_1.StatusCodes.OK));
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(response_1.default.response("Erreur lors du filtrage des tâches", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR));
            }
        });
    }
}
exports.TacheController = TacheController;
