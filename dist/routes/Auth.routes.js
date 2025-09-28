"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_Controller_1 = require("../controller/Auth.Controller");
const authRouter = (0, express_1.Router)();
const authController = new Auth_Controller_1.AuthController();
authRouter.post("/login", (req, res) => authController.login(req, res));
exports.default = authRouter;
