import { Request } from "express";

export type RequestExpress = Request & { user?: Object };

export type RequestObject = Record<string, any>;

