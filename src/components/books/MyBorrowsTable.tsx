"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCover from "@/components/common/BookCover";
import Spinner from "@/components/common/Spinner";
import { apiFetch } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { Borrow } from "@/lib/types";

export default function MyBorrowsTable() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [returningId, setReturningId] = useState<string>("");

  useEffect(() => {
    apiFetch<Borrow[]>("/borrows")
      .then(setBorrows)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleReturn = async (borrow: Borrow) => {
    setReturningId(borrow._id);
    try {
      await apiFetch(`/borrows/${borrow._id}`, { method: "DELETE" });
      setBorrows((prev) => prev.filter((b) => b._id !== borrow._id));
      toast.success(`"${borrow.bookTitle}" returned. Thank you!`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not return the book.");
    } finally {
      setReturningId("");
    }
  };

  if (loading) return <Spinner label="Loading your borrows..." />;

  if (error) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center text-muted-foreground">
        {error}
      </div>
    );
  }

  if (borrows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <p className="text-muted-foreground">You have no borrowed books right now.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Borrow Date</TableHead>
            <TableHead>Return Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {borrows.map((borrow) => (
            <TableRow key={borrow._id}>
              <TableCell>
                <div className="h-16 w-12 overflow-hidden rounded-md border">
                  <BookCover
                    compact
                    book={{
                      _id: borrow.bookId,
                      title: borrow.bookTitle,
                      author: "",
                      category: "Others",
                      image: borrow.bookImage,
                      copies: 0,
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-display text-base font-bold">{borrow.bookTitle}</TableCell>
              <TableCell>{formatDate(borrow.borrowDate)}</TableCell>
              <TableCell>
                <span className="rounded-md border-2 border-dashed border-primary px-2 py-1 text-sm font-semibold text-primary">
                  {formatDate(borrow.returnDate)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="rounded-full"
                  disabled={returningId === borrow._id}
                  onClick={() => handleReturn(borrow)}
                >
                  <Undo2 className="mr-1 h-4 w-4" />
                  {returningId === borrow._id ? "Returning..." : "Return Book"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}