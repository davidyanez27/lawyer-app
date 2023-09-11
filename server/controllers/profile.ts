import { Request, Response } from "express";

import Usuario from "../models/usuario";

export const profile = async (req: Request, res: Response) => {
  interface IUsuario {
    id: number;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }

  const userFound = (await Usuario.findByPk(req.body.id)) as IUsuario | null;

  if (!userFound) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.json({
    id: userFound.id,
    email: userFound.email,
    created: userFound.createdAt,
    updated: userFound.updatedAt,
  });
};

export const editProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }

    await usuario.update(body);
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({
      msg: "No existe un usuario con el id " + id,
    });
  }
  // manera fisica: el usuario es borrado de la base de datos, lo cual no es muy recomendado
  //await usuario.destroy();

  //manera logica
  await usuario.update({ activo: false });
  res.json({ usuario });
};
