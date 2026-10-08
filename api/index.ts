import { Request, Response } from "express";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req: Request, res: Response) {
  await connectDB();

  return app(req, res);
}
