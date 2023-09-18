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

export function createAutorizathion (docxPath: string, request: Request) {
  console.log(request);

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

  const text = doc.getFullText(); // Gets the full text of the document
  const matches = text.match(/{[^}]+}/g) || []; // Regex to match words inside {}

  // Remove the {} braces from each word
  const keys = matches.map((match) => match.slice(1, -1));
  //console.log(keys)

  const requestBody = request.body;

  doc.render({
    name:'jesyus'
  });

  const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
  });

  fs.writeFileSync(path.resolve(__dirname, "../out", `out.docx`), buf);
}

// {pronoun}, {name}, {age_pronoun}, {marital_status}, {nationality}, {address}{and}{name1}{age_pronoun}{marital_status}{nationality}{address}, por medio de la Presente {authorization}, a {son_pronoun} {son_name}{and}{son_name1}, con {document_type} {document_number}{and}{document_type1}{document_number1}, para que {can} salir del país y {travel_pronoun} a {destination}.- Razón por la cual {beg_pronoun} a las autoridades civiles, militares y migratorias de {country_pronoun} País, no poner ningún inconveniente a {son_pronoun} {son_name}{and}{son_name1}, al momento de salir del país y {travel_pronoun} a {destination}.
