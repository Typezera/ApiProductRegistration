import "reflect-metadata";
import dotenv from "dotenv";
import app from "./index";
import { AppDataSource } from "./config/data-source";

dotenv.config();

const port = process.env.PORT || 8000;

console.log("testando...");

async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Loading database...");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
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
