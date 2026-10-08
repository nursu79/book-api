import swaggerJSDoc from "swagger-jsdoc";
import { config } from "./env.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management REST API",
      version: "1.0.0",
      description:
        "Production-grade RESTful API for managing a bookstore catalog built with Express, TypeScript, Zod, and MongoDB.",
      contact: {
        name: "Book API Developer",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: "Development Server",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            _id: { type: "string", example: "651f8a7e2b10a23456789abc" },
            title: { type: "string", example: "Clean Architecture" },
            author: { type: "string", example: "Robert C. Martin" },
            isbn: { type: "string", example: "978-0134494166" },
            publicationYear: { type: "number", example: 2017 },
            categories: {
              type: "array",
              items: { type: "string" },
              example: ["Software Architecture", "Programming"],
            },
            publisher: { type: "string", example: "Prentice Hall" },
            pages: { type: "number", example: 432 },
            language: { type: "string", example: "English" },
            price: { type: "number", example: 34.99 },
            stock: { type: "number", example: 10 },
            description: {
              type: "string",
              example: "Practical software architecture guidelines.",
            },
            isAvailable: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            status: { type: "string", example: "fail" },
            message: { type: "string", example: "Resource not found" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"], // Path to files containing OpenAPI annotations
};

export const swaggerSpec = swaggerJSDoc(options);
