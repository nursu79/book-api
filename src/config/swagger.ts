import swaggerJSDoc from "swagger-jsdoc";

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
        url: "/",
        description: "Current Server (Relative Path)",
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
    paths: {
      "/api/books": {
        get: {
          summary: "Fetch all books with filtering & pagination",
          tags: ["Books"],
          parameters: [
            { in: "query", name: "category", schema: { type: "string" } },
            { in: "query", name: "author", schema: { type: "string" } },
            {
              in: "query",
              name: "page",
              schema: { type: "integer", default: 1 },
            },
            {
              in: "query",
              name: "limit",
              schema: { type: "integer", default: 10 },
            },
          ],
          responses: {
            "200": { description: "List of books retrieved successfully" },
          },
        },
        post: {
          summary: "Create a new book",
          tags: ["Books"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title", "author", "publicationYear", "price"],
                  properties: {
                    title: { type: "string", example: "Clean Code" },
                    author: { type: "string", example: "Robert C. Martin" },
                    publicationYear: { type: "number", example: 2008 },
                    price: { type: "number", example: 32.0 },
                  },
                },
              },
            },
          },
          responses: {
            "201": { description: "Book created successfully" },
            "400": { description: "Validation Error" },
          },
        },
      },
      "/api/books/{id}": {
        get: {
          summary: "Get book by ID",
          tags: ["Books"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": { description: "Book found" },
            "404": { description: "Book not found" },
          },
        },
        patch: {
          summary: "Update book by ID",
          tags: ["Books"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    price: { type: "number", example: 39.99 },
                    stock: { type: "number", example: 25 },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "Book updated successfully" },
            "404": { description: "Book not found" },
          },
        },
        delete: {
          summary: "Delete book by ID",
          tags: ["Books"],
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            "200": { description: "Book deleted successfully" },
            "404": { description: "Book not found" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJSDoc(options);
