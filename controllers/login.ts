import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { createAccessToken } from "../libs/jwt";
import Usuario from "../models/usuario";
import { IUsuario, UserToken } from "../types/interfaces";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  interface Usuario {
    id: number;
    email: string;
    password: string;
  }

  try {
    const userFound = (await Usuario.findOne({
      where: {
        email: email,
      },
    })) as Usuario | null;

    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(400).json({
          message: ["Invalid email or password"],
        });
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
    if (
      typeof error === "object" &&
      error &&
      "message" in error &&
      typeof error.message === "string"
    ) {
      res.status(500).json({
        message: error.message,
      });
    }
    console.log(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const verifyToken = async (req: Request, res: Response) => {
 
  // Load environment variables from .env file
  dotenv.config({ path: "./.env" });
  const secretToken = process.env.TOKEN || "secret";

  const { token } = req.cookies;

  if (!token) return res.send(false);

  jwt.verify(
    token,
    secretToken,
    async (err: Error | null, user: Object | undefined) => {
      if (err) {
        console.log(err);
        return res.sendStatus(401);
      }

      if (user != undefined) {
        const userFound = await Usuario.findByPk((user as UserToken).id);
        if (!userFound) return res.sendStatus(401);

        const userData: UserToken = userFound.get() as UserToken;
        return res.json({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });
      }
    }
  );
};
