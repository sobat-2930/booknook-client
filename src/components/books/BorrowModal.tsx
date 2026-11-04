"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { addDays, formatDate } from "@/lib/format";
import type { Book } from "@/lib/types";

interface BorrowModalProps {
  book: Book;
  onBorrowed?: () => void;
}

export default function BorrowModal({ book, onBorrowed }: BorrowModalProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user;

  if (book.copies <= 0) {
    return (
      <Button size="lg" disabled className="rounded-full">
        Not Available
      </Button>
    );
  }

  const returnDate = addDays(new Date(), 14);

  const handleConfirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch("/borrows", {
        method: "POST",
        body: JSON.stringify({ bookId: book._id }),
      });
      toast.success(`You borrowed "${book.title}". Happy reading!`);
      onBorrowed?.();
      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not borrow this book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full">
          Borrow This Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Borrow “{book.title}”</DialogTitle>
          <DialogDescription>
            Keep it for 14 days. Please return it by{" "}
            <span className="font-semibold text-primary">
              {formatDate(returnDate.toISOString())}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrow-name">Your name</Label>
            <Input id="borrow-name" value={user?.name ?? ""} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrow-email">Your email</Label>
            <Input id="borrow-email" value={user?.email ?? ""} readOnly className="bg-muted" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full">
            {loading ? "Confirming..." : "Confirm Borrow"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}