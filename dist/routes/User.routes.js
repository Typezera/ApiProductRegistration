"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
//Inicialize the router
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
//Api Routes
router.post("/user", (req, res) => userController.create(req, res));
router.get("/user/:id", (req, res) => userController.findById(req, res));
exports.default = router;
