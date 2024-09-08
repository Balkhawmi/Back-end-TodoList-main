"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const routerAuth = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
routerAuth.post("/register", authController.register);
routerAuth.post("/login", authController.login);
exports.default = routerAuth;
