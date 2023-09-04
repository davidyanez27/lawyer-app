import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/usuarios.routes";
import db from "../db/connection";

// Load environment variables from .env file
dotenv.config({ path: "./src/server/.env" });
console.log(process.env.PORT);

class Server {
  private app: Application;
  private port: number;

  private apiPaths = {
    usuarios: "/api/usuarios",
  };

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "4000");

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura del body
    this.app.use(express.json());

    //Carpeta Publica
    this.app.use(express.static("React"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
        console.log(error.message);
      }
    }
  }

  Listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running in ${process.env.PORT}`);
    });
  }
}

export default Server;
