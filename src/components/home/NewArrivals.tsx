"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import BookCard from "@/components/common/BookCard";
import FadeIn from "@/components/common/FadeIn";
import Spinner from "@/components/common/Spinner";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    apiFetch<Book[]>("/books?limit=6", {}, false)
      .then(setBooks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <SectionHeading
        eyebrow="Fresh on the shelf"
        title="New Arrivals"
        subtitle="The six latest books added by our readers."
      />

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
          {error}
        </div>
      ) : books.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-16 text-center">
          <p className="text-muted-foreground">No books yet. Be the first to add one.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/add-book">Add a Book</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <FadeIn key={book._id} delay={i * 0.05} className="h-full">
              <BookCard book={book} />
            </FadeIn>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/books">See All Books</Link>
        </Button>
      </div>
    </section>
  );
}