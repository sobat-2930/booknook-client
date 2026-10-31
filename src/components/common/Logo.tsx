import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
        <BookOpen className="h-5 w-5" />
      </span>
      <span className="font-display text-2xl font-bold tracking-tight">
        Book<span className="text-primary">Nook</span>
      </span>
    </Link>
  );
}