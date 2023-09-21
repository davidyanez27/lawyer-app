import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";


export function readDoc (docxPath: string): { doc: Docxtemplater, obj: Record<string, string> } {

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

  const keys= matches.map(match => match.slice(1, -1));//erease the {}

  const obj = keys.reduce((acc: {[key: string]: string}, key) => {
    acc[key] = ""; // Set empty value for each key
    return acc;
}, {});


  return {doc, obj};

}
