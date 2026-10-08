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
// Serve Swagger UI with CDN assets for serverless environment compatibility
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js",
    ],
  }),
);

app.use("/api/books", bookRouter);

app.use(globalErrorHandler);
export default app;
