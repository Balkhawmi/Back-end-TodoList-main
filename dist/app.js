"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const tache_route_1 = __importDefault(require("./routes/tache.route"));
const app = (0, express_1.default)();
// Configurer CORS
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/v1/taches", tache_route_1.default);
app.use('/api/v1/auth', user_route_1.default);
exports.default = app;
