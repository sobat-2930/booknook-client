import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Book } from "@/lib/types";
import BookCover from "./BookCover";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <div className="h-full w-full transition duration-500 group-hover:scale-105">
          <BookCover book={book} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <span className="mb-3 w-fit rounded-full border border-dashed border-primary px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
          {book.category}
        </span>
        <h3 className="line-clamp-1 text-xl font-bold">{book.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">by {book.author}</p>

        <div className="mt-auto pt-5">
          <Button asChild className="w-full rounded-full">
            <Link href={`/books/${book._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}