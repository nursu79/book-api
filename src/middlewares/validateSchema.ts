import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validateSchema =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsed = (await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })) as { body?: any; query?: any; params?: any };

      if (parsed.body !== undefined) req.body = parsed.body;
      if (parsed.query !== undefined) req.query = parsed.query;
      if (parsed.params !== undefined) req.params = parsed.params;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues.map((err) => ({
            field:
              err.path.length > 1
                ? err.path.slice(1).join(".")
                : err.path.join("."), // Strips 'body' or 'params' prefix for clean field names
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
