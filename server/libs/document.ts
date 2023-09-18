import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";
import { Request } from "express";
import { RequestObject } from "../types/request.types";

interface User {
  name: string;
  gender: string;
  marital_status: string;
  nationality: string;
  address: string;
  document_type: string;
  document_number: string;
}

export function readDoc (docxPath: string) {

  // Load the docx file as binary content
  const content = fs.readFileSync(
    path.resolve(__dirname, "../templates", docxPath),
    "binary"
  );

  const zip = new PizZip(content);

  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  return doc;

}
