import { Book, IBook } from "../models/book.model.js";
import { CreateBookInput, UpdateBookInput } from "../schemas/book.schema.js";

export const createBookService = async (
  input: CreateBookInput["body"],
): Promise<IBook> => {
  return await Book.create(input);
};

export interface FilterBooksOptions {
  category?: string;
  author?: string;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const getAllBooksService = async (
  options: FilterBooksOptions = {},
): Promise<{
  books: IBook[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const {
    category,
    author,
    isAvailable,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = options;

  const query: Record<string, unknown> = {};

  if (category) {
    query.categories = category;
  }

  if (author) {
    query.author = { $regex: author, $options: "i" };
  }

  if (isAvailable !== undefined) {
    query.isAvailable = isAvailable;
  }

  const skip = (page - 1) * limit;
  const sortDirection = sortOrder === "asc" ? 1 : -1;

  const [books, total] = await Promise.all([
    Book.find(query)
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(limit),
    Book.countDocuments(query),
  ]);

  return {
    books,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getBookByIdService = async (id: string): Promise<IBook | null> => {
  return await Book.findById(id);
};

export const updateBookService = async (
  id: string,
  input: UpdateBookInput["body"],
): Promise<IBook | null> => {
  return await Book.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });
};

export const deleteBookService = async (id: string): Promise<IBook | null> => {
  return await Book.findByIdAndDelete(id);
};
