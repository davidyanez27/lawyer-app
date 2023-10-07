import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/usuarios.routes";
import documentRoutes from './routes/document.routes'
import db from "./db/connection";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });
console.log(process.env.PORT);

class Server {
  private app: Application;
  private port: number;

  private apiPaths = {
    usuarios: "/api/users",
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
    this.app.use(cors({
      origin:'http://localhost:5173',
      credentials:true,
    }));

    //Lectura del body
    this.app.use(express.json());

    //Lectura de cookies
    this.app.use(cookieParser());

    //Carpeta Publica
    this.app.use(express.static("React"));
  }

  routes() {
    this.app.use(this.apiPaths.usuarios, userRoutes);
    //Documents
    this.app.use(this.apiPaths.usuarios, documentRoutes);
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      if (
        typeof error === "object" &&
        error &&
        "message" in error &&
        typeof error.message === "string"
      ) {
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
