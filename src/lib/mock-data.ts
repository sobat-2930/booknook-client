import type { Book, Category } from "./types";

export const categories: Category[] = ["Fiction", "Science", "History", "Kids", "Others"];

export const mockBooks: Book[] = [
  { _id: "1", title: "The Midnight Library", author: "Matt Haig", category: "Fiction", image: "", copies: 4 },
  { _id: "2", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", image: "", copies: 2 },
  { _id: "3", title: "Sapiens", author: "Yuval Noah Harari", category: "History", image: "", copies: 3 },
  { _id: "4", title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Kids", image: "", copies: 5 },
  { _id: "5", title: "Atomic Habits", author: "James Clear", category: "Others", image: "", copies: 0 },
  { _id: "6", title: "Cosmos", author: "Carl Sagan", category: "Science", image: "", copies: 1 },
];