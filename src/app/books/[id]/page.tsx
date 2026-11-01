import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrivateRoute from "@/components/common/PrivateRoute";
import BookCover from "@/components/common/BookCover";
import BorrowModal from "@/components/books/BorrowModal";
import { mockBooks } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const book = mockBooks.find((b) => b._id === id);
  return { title: book ? book.title : "Book Details" };
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  // later: fetch GET /books/:id from the Express server
  const book = mockBooks.find((b) => b._id === id);
  if (!book) notFound();

  const available = book.copies > 0;

  return (
    <PrivateRoute>
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
              <p className="text-sm text-muted-foreground">{book.userEmail ?? "reader@booknook.app"}</p>
            </div>

            <div className="mt-10">
              <BorrowModal book={book} />
            </div>
          </div>
        </div>
      </section>
    </PrivateRoute>
  );
}