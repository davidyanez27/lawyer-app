import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { createAccessToken } from "../libs/jwt";
import Usuario from "../models/usuario";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  interface IUsuario {
    id:number;
    email: string;
    password: string;
}

  try {
    const userFound = await Usuario.findOne({
      where: {
        email: email
      },
    })as IUsuario | null;

    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);
        if(!isMatch){
            return res.status(400).json({ message: "Invalid email or password"})
        }


    } else {
      return res.status(400).json({
        msg: "There is no user with this email",
      });
    }

    //encryptic the password

    //create the JWT
    const token = await createAccessToken({ id: userFound.id });
    res.cookie("token", token);

    res.json({ email: userFound.email });
  } catch (error) {
    if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
      res.status(500).json({
        message: error.message
      });
    }
    console.log(error);
    
  }
};


export const logout = (req: Request, res: Response) => {
   res.cookie('token', "", {
    expires: new Date(0)
   })
   return res.sendStatus(200);
  };
