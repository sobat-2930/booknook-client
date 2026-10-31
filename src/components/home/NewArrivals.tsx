import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/common/SectionHeading";
import BookCard from "@/components/common/BookCard";
import FadeIn from "@/components/common/FadeIn";
import type { Book } from "@/lib/types";

export default function NewArrivals({ books }: { books: Book[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20">
      <SectionHeading
        eyebrow="Fresh on the shelf"
        title="New Arrivals"
        subtitle="The six latest books added by our readers."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book, i) => (
          <FadeIn key={book._id} delay={i * 0.05} className="h-full">
            <BookCard book={book} />
          </FadeIn>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/books">See All Books</Link>
        </Button>
      </div>
    </section>
  );
}