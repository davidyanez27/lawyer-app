import { Request } from "express";

export type RequestExpress = Request & { user?: Object };
