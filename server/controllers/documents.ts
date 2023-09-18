import { Request, Response, response } from "express";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";



export const createDocument = async (req: Request, res: Response) => {

    try {
  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname,'../templates',"autorizathion1.docx"),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
  doc.render(req.body);

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: "DEFLATE",
  });

  // buf is a nodejs Buffer, you can either write it to a
  // file or res.send it with express for example.
  fs.writeFileSync(path.resolve(__dirname,'../out', `gf.docx`), buf);

res.json(req.body);
    
    } catch (error) {
      if (typeof error === "object" && error && "message" in error && typeof error.message === "string") {
        res.status(500).json({
          message: error.message
        });
      }
      console.log(error);
      
    }
  };
  

export const getDocument = async (req: Request, res: Response) => {};
//export const createDocument = async (req: Request, res: Response) => {};
export const updateDocument = async (req: Request, res: Response) => {};
export const deleteDocument = async (req: Request, res: Response) => {};
