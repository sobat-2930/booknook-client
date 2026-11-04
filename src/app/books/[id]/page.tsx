import type { Metadata } from "next";
import PrivateRoute from "@/components/common/PrivateRoute";
import BookDetails from "@/components/books/BookDetails";

export const metadata: Metadata = { title: "Book Details" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailsPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <PrivateRoute>
      <BookDetails id={id} />
    </PrivateRoute>
  );
}
