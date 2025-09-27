import userRouter from "./routes/User.routes";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { config } from "dotenv";

config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);

//Swagger configs/docs
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Cadastro de Produtos",
      version: "1.0.0",
      description: "Documentation of API Products Register",
    },
  },
  apis: ["./src/routes/*.ts", "./src/docs/*.ts"],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

export default app;
