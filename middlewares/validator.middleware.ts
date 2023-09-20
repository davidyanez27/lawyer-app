import { Response } from "express";
import { RequestExpress } from "../types/request.types";

type Next = () => void | Promise<void>;
export const validateSchema =
  (schema: any) => (req: RequestExpress, res: Response, next: Next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error });
    }
  };
