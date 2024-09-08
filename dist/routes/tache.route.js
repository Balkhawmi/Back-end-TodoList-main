"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = require("../middlewares/validator/validator.middleware");
const tache_controller_1 = require("../controllers/tache.controller");
const routerTache = (0, express_1.Router)();
const tacheController = new tache_controller_1.TacheController();
// Route pour créer une nouvelle tâche
routerTache.post("/", [(0, validator_middleware_1.validatorSchema)()], tacheController.store);
// Route pour récupérer toutes les tâches
routerTache.get("/", tacheController.show);
// Route pour récupérer une tâche par ID et la modifier
routerTache.post("/:id", tacheController.edit);
// Route pour récupérer toutes les tâches d'un utilisateur à partir de son ID
routerTache.get("/:userId", tacheController.getTachesByUserId);
// Route pour modifier une tâche ou un de ses éléments par son ID
routerTache.put("/:id", tacheController.editTache);
// Route pour archiver une tâche (mettre à jour son état à 'false')
routerTache.put("/archive/:id", tacheController.archiveTache);
// Route pour filtrer les tâches par statut (complete ou incomplete)
routerTache.get("/statut/:statut", tacheController.tacheStatut);
exports.default = routerTache;
