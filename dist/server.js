"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./index"));
const data_source_1 = require("./config/data-source");
dotenv_1.default.config();
const port = process.env.PORT || 8000;
console.log("testando...");
async function start() {
    try {
        await data_source_1.AppDataSource.initialize();
        console.log("Loading database...");
        index_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
    catch (error) {
        console.error("Error during Data Source initialization", error);
        process.exit(1);
    }
}
start();
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Loading database...");
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error during Data Source initialization", error);
//     process.exit(1);
//   });
