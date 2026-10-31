export type Category = "Fiction" | "Science" | "History" | "Kids" | "Others";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: Category;
  image: string;
  description?: string;
  copies: number;
  userName?: string;
  userEmail?: string;
  createdAt?: string;
}

export interface Borrow {
  _id: string;
  bookId: string;
  bookTitle: string;
  bookImage: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
}

export interface AppUser {
  name: string;
  email: string;
  image?: string;
}