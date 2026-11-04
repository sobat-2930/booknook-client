import type { Metadata } from "next";
import { Suspense } from "react";
import SectionHeading from "@/components/common/SectionHeading";
import Spinner from "@/components/common/Spinner";
import BooksExplorer from "@/components/books/BooksExplorer";

export const metadata: Metadata = { title: "All Books" };

export default function BooksPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHeading
        eyebrow="The full shelf"
        title="All Books"
        subtitle="Every book in the nook. Search, filter, and pick your next read."
      />
      <Suspense fallback={<Spinner />}>
        <BooksExplorer />
      </Suspense>
    </section>
  );
}
