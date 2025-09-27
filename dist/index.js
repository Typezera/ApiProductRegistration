"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
const swaggerDoc = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
exports.default = app;
