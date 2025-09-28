import { Router } from "express";
import { UserController } from "../controller/user/user.controller";

//Inicialize the router
const userRouter = Router();
const userController = new UserController();

//Api Routes
userRouter.post("/", (req, res) => userController.create(req, res));
userRouter.get("/:id", (req, res) => userController.findById(req, res));
userRouter.get("/", (req, res) => userController.findAll(req, res));

export default userRouter;
