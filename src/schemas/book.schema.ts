import { z } from "zod";

export const createBookSchema = z.object({
  body: z.object({
    title: z
      .string({ message: "Title is required" })
      .min(1, "Title cannot be empty")
      .max(150, "Title cannot exceed 150 characters")
      .trim(),
    author: z
      .string({ message: "Author is required" })
      .min(1, "Author cannot be empty")
      .trim(),
    isbn: z
      .string()
      .trim()
      .regex(
        /^(?:ISBN(?:-1[03])?:?\s*)?(?=(?:\D*\d){10}$|(?:\D*\d){13}$)[0-9X\s-]+$/i,
        "Invalid ISBN format. Must be a valid ISBN-10 or ISBN-13",
      )
      .optional(),

    publicationYear: z
      .number({ message: "Publication year is required" })
      .int("Publication year must be an integer")
      .min(1000, "Publication year must be at least 1000")
      .max(
        new Date().getFullYear(),
        "Publication year cannot be in the future",
      ),
    categories: z
      .array(z.string().trim())
      .optional()
      .default(["Uncategorized"]),
    publisher: z.string().trim().optional(),
    pages: z.number().int().min(1, "Page count must be at least 1").optional(),
    language: z.string().trim().optional().default("English"),
    price: z
      .number({ message: "Price is required" })
      .min(0, "Price cannot be negative")
      .default(0),
    stock: z
      .number()
      .int()
      .min(0, "Stock cannot be negative")
      .optional()
      .default(1),
    description: z
      .string()
      .max(2000, "Description cannot exceed 2000 characters")
      .trim()
      .optional(),
    isAvailable: z.boolean().optional().default(true),
  }),
});

export const updateBookSchema = z.object({
  body: createBookSchema.shape.body.partial(),
  params: z.object({
    id: z.string().min(1, "Book ID is required"),
  }),
});

export const getBookParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Book ID is required"),
  }),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
export type GetBookParamsInput = z.infer<typeof getBookParamsSchema>;
