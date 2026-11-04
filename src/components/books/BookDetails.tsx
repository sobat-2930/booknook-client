"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BookCover from "@/components/common/BookCover";
import Spinner from "@/components/common/Spinner";
import BorrowModal from "@/components/books/BorrowModal";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function BookDetails({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    apiFetch<Book>(`/books/${id}`)
      .then(setBook)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner label="Loading book details..." />;

  if (error || !book) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Book not found</h1>
        <p className="mt-3 text-muted-foreground">
          {error || "This book may have been removed."}
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link href="/books">Back to All Books</Link>
        </Button>
      </section>
    );
  }

  const available = book.copies > 0;

  return (
    <section className="paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-[340px_1fr]">
        <div className="mx-auto w-full max-w-xs">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl border-2 border-foreground/70 shadow-xl">
            <BookCover book={book} />
          </div>
        </div>

        <div>
          <span className="rounded-full border border-dashed border-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            {book.category}
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>

          <div className="mt-6 flex items-center gap-4">
            <span
              className={`rotate-[-2deg] rounded-md border-4 border-double px-3 py-1 font-display text-sm font-bold uppercase tracking-widest ${
                available ? "border-secondary text-secondary" : "border-destructive text-destructive"
              }`}
            >
              {available ? `${book.copies} copies left` : "All copies out"}
            </span>
          </div>

          <h2 className="mt-8 text-xl font-bold">About this book</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
            {book.description ?? "The owner has not added a description for this book yet."}
          </p>

          <div className="mt-8 w-fit rounded-xl border border-dashed border-foreground/40 bg-card px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Added by</p>
            <p className="font-display text-lg font-bold">{book.userName ?? "BookNook Reader"}</p>
            <p className="text-sm text-muted-foreground">{book.userEmail}</p>
          </div>

          <div className="mt-10">
            <BorrowModal
              book={book}
              onBorrowed={() =>
                setBook((b) => (b ? { ...b, copies: Math.max(0, b.copies - 1) } : b))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}