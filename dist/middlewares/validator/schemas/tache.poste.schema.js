"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tachePostSchema = void 0;
const zod_1 = require("zod");
exports.tachePostSchema = zod_1.z.object({
    libelle: zod_1.z.string({
        required_error: "Le libelle est obligatoire",
    }).min(1, "Le libelle ne peut pas être vide"),
    statut: zod_1.z.string({
        required_error: "Le statut est obligatoire",
    }).min(1, "Le statut ne peut pas être vide"),
    etat: zod_1.z.boolean({
        required_error: "L'état est obligatoire",
    }),
});
