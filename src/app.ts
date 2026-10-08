import express from "express";
import helmet from "helmet";
import cors from "cors";
import bookRouter from "./routes/book.routes.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import { swaggerSpec } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/books", bookRouter);

app.use(globalErrorHandler);
export default app;
