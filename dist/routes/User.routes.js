"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user/user.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
//Inicialize the router
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
//Api Routes
userRouter.post("/", (req, res) => userController.create(req, res));
//Protected routes
userRouter.get("/:id", auth_middleware_1.default, (req, res) => userController.findById(req, res));
userRouter.get("/", auth_middleware_1.default, (req, res) => userController.findAll(req, res));
exports.default = userRouter;
