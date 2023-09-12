import { Request, Response } from 'express';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import fs from 'fs';

export const getDocuments = async (req: Request, res: Response) => {
    try {
        const buffer = loadDocx('../templates/template.docx', { 'name': 'John Doe' });

        // Assuming you want to send the generated .docx file back in the response
        res.setHeader('Content-Disposition', 'attachment; filename=output.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.json({buffer});
    } catch (error) {
        res.status(500).send({ error: 'Failed to generate document' });
    }
};

const loadDocx = (filePath: string, data: any): Buffer => {
    const content = fs.readFileSync(filePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater().loadZip(zip);

    doc.setData(data); // Set the data for placeholders

    try {
        doc.render();
    } catch (error) {
        console.error('Error during rendering', error);
        throw error;
    }

    const output = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE'
    });
        console.log(output);

    return output;
};

export const getDocument = async(req: Request, res: Response)=>{};
export const createDocument = async(req: Request, res: Response)=>{};
export const updateDocument = async(req: Request, res: Response)=>{};
export const deleteDocument = async(req: Request, res: Response)=>{};
