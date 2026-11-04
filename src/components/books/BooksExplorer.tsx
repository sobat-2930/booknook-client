"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/common/BookCard";
import Spinner from "@/components/common/Spinner";
import { categories } from "@/lib/mock-data";
import { apiFetch } from "@/lib/api";
import type { Book } from "@/lib/types";

export default function BooksExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get("category") ?? "All";
  const [query, setQuery] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    apiFetch<Book[]>("/books", {}, false)
      .then(setBooks)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const changeCategory = (c: string) => {
    router.replace(c === "All" ? pathname : `${pathname}?category=${c}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const matchCat = category === "All" || b.category === category;
      const matchText =
        !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [books, category, query]);

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or author"
            className="rounded-full bg-card pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              onClick={() => changeCategory(c)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-dashed border-foreground/30 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
          No books match your search. Try a different word or category.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}