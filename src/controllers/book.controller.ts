import { Request, Response } from "express";
import {
  createBookService,
  getAllBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  FilterBooksOptions,
} from "../services/book.service.js";
import {
  CreateBookInput,
  UpdateBookInput,
  GetBookParamsInput,
} from "../schemas/book.schema.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

// 1. Create Book Handler
export const createBookHandler = catchAsync(
  async (
    req: Request<{}, {}, CreateBookInput["body"]>,
    res: Response,
  ): Promise<void> => {
    const book = await createBookService(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  },
);

// 2. Get All Books Handler
export const getAllBooksHandler = catchAsync(
  async (
    req: Request<{}, {}, {}, FilterBooksOptions>,
    res: Response,
  ): Promise<void> => {
    const { category, author, isAvailable, page, limit, sortBy, sortOrder } =
      req.query;

    const result = await getAllBooksService({
      category: category ? String(category) : undefined,
      author: author ? String(author) : undefined,
      isAvailable:
        isAvailable !== undefined ? String(isAvailable) === "true" : undefined,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
      sortBy: sortBy ? String(sortBy) : undefined,
      sortOrder: sortOrder as "asc" | "desc" | undefined,
    });

    res.status(200).json({
      success: true,
      data: result.books,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  },
);

// 3. Get Single Book Handler
export const getBookByIdHandler = catchAsync(
  async (
    req: Request<GetBookParamsInput["params"]>,
    res: Response,
  ): Promise<void> => {
    const book = await getBookByIdService(req.params.id);

    if (!book) {
      throw new AppError(`Book with ID '${req.params.id}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  },
);

// 4. Update Book Handler
export const updateBookHandler = catchAsync(
  async (
    req: Request<UpdateBookInput["params"], {}, UpdateBookInput["body"]>,
    res: Response,
  ): Promise<void> => {
    const updatedBook = await updateBookService(req.params.id, req.body);

    if (!updatedBook) {
      throw new AppError(`Book with ID '${req.params.id}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  },
);

// 5. Delete Book Handler
export const deleteBookHandler = catchAsync(
  async (
    req: Request<GetBookParamsInput["params"]>,
    res: Response,
  ): Promise<void> => {
    const deletedBook = await deleteBookService(req.params.id);

    if (!deletedBook) {
      throw new AppError(`Book with ID '${req.params.id}' not found`, 404);
    }

    res.status(200).json({
      success: true,
      message: `Book '${deletedBook.title}' deleted successfully`,
    });
  },
);
