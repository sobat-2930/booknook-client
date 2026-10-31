import type { Book } from "@/lib/types";

const palette: Record<string, [string, string]> = {
  Fiction: ["#1f3d36", "#d9a441"],
  Science: ["#243b6b", "#e8c872"],
  History: ["#6b2d1f", "#f0d9a8"],
  Kids: ["#c8553d", "#fff1d6"],
  Others: ["#4a3b2a", "#d9a441"],
};

export default function BookCover({ book }: { book: Book }) {
  if (book.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={book.image} alt={book.title} className="h-full w-full object-cover" />
    );
  }

  const [bg, fg] = palette[book.category] ?? palette.Others;

  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5"
      style={{ background: bg, color: fg }}
    >
      <div className="h-1 w-10 rounded-full" style={{ background: fg }} />
      <div>
        <p className="font-display text-xl font-bold leading-tight">{book.title}</p>
        <p className="mt-2 text-xs uppercase tracking-widest opacity-80">{book.author}</p>
      </div>
    </div>
  );
}