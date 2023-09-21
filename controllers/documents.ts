import { Request, Response} from "express";
import fs from "fs";
import path from "path";
import { readDoc } from "../libs/document";

export const createDocument = async (req: Request, res: Response) => {
  try {
    const {name, and, name1} = req.body;

    const {doc, obj} = readDoc("autorizathion.docx");    
    const mergedData = { ...obj, ...req.body };
    
    doc.render(mergedData);

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
    fs.writeFileSync(path.resolve(__dirname, "../out", `autorizacion para salir del pais ${name}${and==undefined?'':and}${name1==undefined?'':name1}.docx`), buf);
    res.json(req.body);

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

export const getDocument = async (req: Request, res: Response) => {};
//export const createDocument = async (req: Request, res: Response) => {};
export const updateDocument = async (req: Request, res: Response) => {};
export const deleteDocument = async (req: Request, res: Response) => {};
