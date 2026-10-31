import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="paper flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-bold text-primary md:text-9xl">404</p>
      <h1 className="mt-4 text-3xl font-bold">This page is missing from the shelf</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The book you are looking for may have been moved, returned, or never existed.
      </p>
      <Button asChild size="lg" className="mt-8 rounded-full">
        <Link href="/">Back to Home</Link>
      </Button>
    </section>
  );
}