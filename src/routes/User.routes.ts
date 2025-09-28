import { Router } from "express";
import { UserController } from "../controller/user/user.controller";
import authMiddleware from "../middleware/auth.middleware";

//Inicialize the router
const userRouter = Router();
const userController = new UserController();

//Api Routes
userRouter.post("/", (req, res) => userController.create(req, res));
//Protected routes
userRouter.get("/:id", authMiddleware, (req, res) =>
  userController.findById(req, res)
);
userRouter.get("/", authMiddleware, (req, res) =>
  userController.findAll(req, res)
);

export default userRouter;
