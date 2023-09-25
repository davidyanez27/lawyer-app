import { Response } from "express";
import { RequestExpress } from "../types/request.types";


interface ValidationError extends Error {
 issues: { message: string }[];
}

type Next = () => void | Promise<void>;
export const validateSchema =
  (schema: any) => (req: RequestExpress, res: Response, next: Next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error: (error as ValidationError).issues.map(error => error.message)});
    }
  };
