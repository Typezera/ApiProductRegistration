import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { config } from "dotenv";

config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Cadastro de Produtos",
      version: "1.0.0",
      description: "Documentation of API Products Register",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDoc = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
