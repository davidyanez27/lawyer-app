import express, { Application } from "express";

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({path:'./src/server/.env'});
console.log(process.env.PORT);

class Server {
  private app: Application;
  private port: number;


  private apiPaths={
    usuarios: 'api/usuarios'
  }


  constructor() {
    this.app  = express();
    this.port = parseInt(process.env.PORT || "4000");
  }

  Listen() {

    this.app.listen(this.port, () => {
      console.log(`Server is running in ${process.env.PORT}`);
    });
  }
}

export default Server;