import { Request, Response } from "express";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";

export default async function handler(req: Request, res: Response) {
  try {
    await connectDB();
  } catch (error) {
    console.error("Serverless Database Connection Error:", (error as Error).message);
  }

  return app(req, res);
}
