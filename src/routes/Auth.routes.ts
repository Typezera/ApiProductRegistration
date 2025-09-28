import { Router } from "express";
import { AuthController } from "../controller/Auth.Controller";

const authRouter = Router();
const authController = new AuthController();

authRouter.post("/login", (req, res) => authController.login(req, res));

export default authRouter;
