import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Op } from "sequelize";

import {createAccessToken} from '../libs/jwt'
import Usuario from "../models/usuario";

export const register = async (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;


  try {
    const existUsername = await Usuario.findOne({
      where: {
        id: id,
      },
    });

    if (existUsername) {
      return res.status(400).json({
        message: ["This id has alredy been taken"]
      });
    }

    const existEmail = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (existEmail) {
      return res.status(400).json({
        message: ["This email has alredy been taken"]
      });
    }

    //encryptic the password
    const passwordHash = await bcrypt.hash(password, 10); 

    //create the JWT
    const token = await createAccessToken({id:id}); 
    res.cookie('token',token);

    const requestUsuario = await Usuario.build({
      id,
      name,
      email,
      password: passwordHash,
    });
    const usuario = await requestUsuario.save();
    res.json({ usuario });
  } catch (error) {
    if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
      res.status(500).json({
        message: error.message
      });
    }
    console.log(error);
    
  }
};
