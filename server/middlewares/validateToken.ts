import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

type Next = () => void | Promise<void>;

export const authRequired = (req: Request, res: Response, next: Next) => {
  // Load environment variables from .env file
  dotenv.config({ path: "./.env" });
  const secretToken = process.env.TOKEN || "secret";

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(
    token,
    secretToken,
    (err: Error | null, user: Object | undefined) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      console.log(user);
      req.body = user;

      return next();
    }
  );
};