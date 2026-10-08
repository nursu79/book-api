import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";
export interface IBook extends Document {
  title: string;
  author: string;
  isbn?: string;
  publicationYear: number;
  categories: string[];
  publisher?: string;
  pages?: number;
  language: string;
  price: number;
  stock: number;
  description?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Year must be at least 1000"],
      max: [
        new Date().getFullYear(),
        "Publication year cannot be in the future",
      ],
    },
    categories: {
      type: [String],
      default: ["Uncategorized"],
      set: (vals: string[]) => (vals.length === 0 ? ["Uncategorized"] : vals),
    },
    publisher: {
      type: String,
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, "Page count must be at least 1"],
    },
    language: {
      type: String,
      default: "English",
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      default: 0.0,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 1,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Book = model<IBook>("Book", bookSchema);
