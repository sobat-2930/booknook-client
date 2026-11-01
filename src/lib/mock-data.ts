import type { AppUser, Book, Borrow, Category } from "./types";

export const categories: Category[] = ["Fiction", "Science", "History", "Kids", "Others"];

// export const mockBooks: Book[] = [
//   { _id: "1", title: "The Midnight Library", author: "Matt Haig", category: "Fiction", image: "", copies: 4 },
//   { _id: "2", title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", image: "", copies: 2 },
//   { _id: "3", title: "Sapiens", author: "Yuval Noah Harari", category: "History", image: "", copies: 3 },
//   { _id: "4", title: "The Little Prince", author: "Antoine de Saint-Exupéry", category: "Kids", image: "", copies: 5 },
//   { _id: "5", title: "Atomic Habits", author: "James Clear", category: "Others", image: "", copies: 0 },
//   { _id: "6", title: "Cosmos", author: "Carl Sagan", category: "Science", image: "", copies: 1 },
// ];
const cover = (isbn: string): string =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

export const mockBooks: Book[] = [
  {
    _id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    category: "Fiction",
    image: cover("9780525559474"),
    copies: 4,
    description:
      "Between life and death sits a library where every book is a different life Nora could have lived. A warm, hopeful story about regret and second chances.",
    createdAt: "2026-10-20",
  },
  {
    _id: "2",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    image: cover("9780553380163"),
    copies: 2,
    description:
      "A clear tour of black holes, the Big Bang and the nature of time, written for readers with no physics background.",
    createdAt: "2026-10-05",
  },
  {
    _id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    image: cover("9780062316097"),
    copies: 3,
    description:
      "How a small ape became the ruler of the planet, told through farming, money, empires and belief.",
    createdAt: "2026-10-08",
  },
  {
    _id: "4",
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    category: "Kids",
    image: cover("9780156012195"),
    copies: 5,
    description:
      "A pilot meets a young prince from a tiny planet and learns what really matters in life.",
    createdAt: "2026-09-28",
  },
  {
    _id: "5",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Others",
    image: cover("9780735211292"),
    copies: 0,
    description:
      "A practical guide to building good habits and breaking bad ones through small daily changes.",
    createdAt: "2026-10-02",
  },
  {
    _id: "6",
    title: "Cosmos",
    author: "Carl Sagan",
    category: "Science",
    image: cover("9780345539434"),
    copies: 1,
    description:
      "A journey through space and time that explains how humans came to understand the universe.",
    createdAt: "2026-09-20",
  },
  {
    _id: "7",
    title: "Dune",
    author: "Frank Herbert",
    category: "Fiction",
    image: cover("9780441013593"),
    copies: 3,
    description:
      "On the desert planet Arrakis, a young heir is swept into a war over the most valuable substance in the universe.",
    createdAt: "2026-10-25",
  },
  {
    _id: "8",
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    image: cover("9780451524935"),
    copies: 2,
    description:
      "A chilling story of a man who dares to think freely in a world watched by Big Brother.",
    createdAt: "2026-10-18",
  },
  {
    _id: "9",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    category: "Science",
    image: cover("9780198788607"),
    copies: 2,
    description:
      "A classic that looks at evolution from the point of view of genes, not animals.",
    createdAt: "2026-10-14",
  },
  {
    _id: "10",
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    category: "History",
    image: cover("9780393317558"),
    copies: 3,
    description:
      "Why some societies grew powerful while others did not, explained through geography, crops and disease.",
    createdAt: "2026-10-10",
  },
  {
    _id: "11",
    title: "Charlotte's Web",
    author: "E. B. White",
    category: "Kids",
    image: cover("9780064400558"),
    copies: 4,
    description:
      "A clever spider saves her friend Wilbur the pig in this gentle story about friendship.",
    createdAt: "2026-10-22",
  },
  {
    _id: "12",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Others",
    image: cover("9781455586691"),
    copies: 2,
    description:
      "How to focus without distraction and produce your best work in a noisy world.",
    createdAt: "2026-10-28",
  },
];

export const mockUser: AppUser = {
  name: "Su",
  email: "su@example.com",
  image: "",
};

export const mockBorrows: Borrow[] = [
  {
    _id: "b1",
    bookId: "2",
    bookTitle: "A Brief History of Time",
    bookImage: "",
    userEmail: "su@example.com",
    borrowDate: "2026-10-25",
    returnDate: "2026-11-08",
  },
  {
    _id: "b2",
    bookId: "6",
    bookTitle: "Cosmos",
    bookImage: "",
    userEmail: "su@example.com",
    borrowDate: "2026-10-28",
    returnDate: "2026-11-11",
  },
];