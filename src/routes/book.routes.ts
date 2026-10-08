import { Router } from "express";
import {
  createBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
} from "../controllers/book.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createBookSchema,
  updateBookSchema,
  getBookParamsSchema,
} from "../schemas/book.schema.js";

const router = Router();

/**
 * @openapi
 * /api/books:
 *   get:
 *     summary: Fetch all books with filtering & pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: author
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of books retrieved successfully
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, publicationYear, price]
 *             properties:
 *               title: { type: string, example: "Refactoring" }
 *               author: { type: string, example: "Martin Fowler" }
 *               publicationYear: { type: number, example: 2018 }
 *               price: { type: number, example: 47.99 }
 *     responses:
 *       201:
 *         description: Book created successfully
 */
router
  .route("/")
  .get(getAllBooksHandler)
  .post(validateSchema(createBookSchema), createBookHandler);
/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *   patch:
 *     summary: Update book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "Clean Code (Updated Edition)" }
 *               author: { type: string, example: "Robert C. Martin" }
 *               price: { type: number, example: 39.99 }
 *               stock: { type: number, example: 25 }
 *               isAvailable: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Validation Error or Invalid ID
 *       404:
 *         description: Book not found
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router
  .route("/:id")
  .get(validateSchema(getBookParamsSchema), getBookByIdHandler)
  .patch(validateSchema(updateBookSchema), updateBookHandler)
  .delete(validateSchema(getBookParamsSchema), deleteBookHandler);

export default router;
