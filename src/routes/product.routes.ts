import { Router } from "express";
import { ProductController } from "../controller/product/product.controller"; //ProductController from "../controller/product/product.controller";
import authMiddleware from "../middleware/auth.middleware";

const productRouter = Router();
const productController = new ProductController();

productRouter.post("/", authMiddleware, (req, res) =>
  productController.create(req, res)
);

export default productRouter;
