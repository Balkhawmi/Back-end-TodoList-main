import { Router } from "express";
import { validatorSchema } from "../middlewares/validator/validator.middleware";
import { TacheController } from "../controllers/tache.controller";

const routerTache = Router();
const tacheController = new TacheController();

// Route pour créer une nouvelle tâche
routerTache.post("/", [validatorSchema()], tacheController.store);

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

export default routerTache;
