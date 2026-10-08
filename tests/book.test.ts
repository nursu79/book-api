import supertest from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import { connectDB } from "../src/config/db.js";
import { Book } from "../src/models/book.model.js";

const request = supertest(app);

describe("📚 Book API Integration Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterEach(async () => {
    await Book.deleteMany({});
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe("POST /api/books", () => {
    it("should create a new book successfully with 201 Created", async () => {
      const bookData = {
        title: "Test Book",
        author: "Test Author",
        publicationYear: 2023,
        price: 29.99,
      };

      const res = await request.post("/api/books").send(bookData).expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(bookData.title);
      expect(res.body.data.author).toBe(bookData.author);
      expect(res.body.data.categories).toEqual(["Uncategorized"]);
    });

    it("should return 400 Bad Request when required fields are missing", async () => {
      const res = await request
        .post("/api/books")
        .send({ author: "Only Author" })
        .expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Validation Error");
    });
  });
  describe("GET /api/books", () => {
    it("should fetch all books with 200 OK and pagination", async () => {
      await Book.create({
        title: "Book 1",
        author: "Author 1",
        publicationYear: 2020,
        price: 15,
      });

      const res = await request.get("/api/books").expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.pagination.total).toBe(1);
    });
  });

  describe("GET /api/books/:id", () => {
    it("should return 404 Not Found for a non-existent book ID", async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      const res = await request.get(`/api/books/${nonExistentId}`).expect(404);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain("not found");
    });

    it("should return 400 Bad Request for an invalid ID format", async () => {
      const res = await request.get("/api/books/invalid-id-123").expect(400);

      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Invalid resource ID format");
    });
  });
});
