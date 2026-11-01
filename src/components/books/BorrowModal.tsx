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
import { mockUser } from "@/lib/mock-data";
import { addDays, formatDate } from "@/lib/format";
import type { Book } from "@/lib/types";

export default function BorrowModal({ book }: { book: Book }) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = mockUser; // later: BetterAuth session

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
    // later: POST /borrows with bookId, title, image, user email, dates
    await new Promise((r) => setTimeout(r, 600));
    toast.success(`You borrowed "${book.title}". Happy reading!`);
    setLoading(false);
    setOpen(false);
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
            <span className="font-semibold text-primary">{formatDate(returnDate.toISOString())}</span>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="borrow-name">Your name</Label>
            <Input id="borrow-name" value={user.name} readOnly className="bg-muted" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="borrow-email">Your email</Label>
            <Input id="borrow-email" value={user.email} readOnly className="bg-muted" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full">
            {loading ? "Confirming..." : "Confirm Borrow"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}