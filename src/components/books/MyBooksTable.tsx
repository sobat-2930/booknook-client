"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCover from "@/components/common/BookCover";
import { categories, mockBooks, mockUser } from "@/lib/mock-data";
import type { Book, Category } from "@/lib/types";

interface EditFormProps {
  book: Book;
  onSave: (b: Book) => void;
  onCancel: () => void;
}

function EditForm({ book, onSave, onCancel }: EditFormProps) {
  const [category, setCategory] = useState<Category>(book.category);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSave({
      ...book,
      title: String(fd.get("title")),
      author: String(fd.get("author")),
      category,
      copies: Number(fd.get("copies")),
      description: String(fd.get("description")),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="e-title">Book Title</Label>
        <Input id="e-title" name="title" defaultValue={book.title} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-author">Author Name</Label>
        <Input id="e-author" name="author" defaultValue={book.author} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="e-copies">Total Copies</Label>
          <Input id="e-copies" name="copies" type="number" min={0} defaultValue={book.copies} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="e-desc">Short Description</Label>
        <Textarea id="e-desc" name="description" rows={3} defaultValue={book.description ?? ""} />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="rounded-full">
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  );
}

export default function MyBooksTable() {
  // later: GET /books filtered by the logged in user's email
  const [books, setBooks] = useState<Book[]>(
    mockBooks.slice(0, 4).map((b) => ({
      ...b,
      userName: mockUser.name,
      userEmail: mockUser.email,
    }))
  );
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);

  const handleSave = (updated: Book) => {
    // later: PATCH /books/:id
    setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    setEditing(null);
    toast.success("Book updated successfully.");
  };

  const handleDelete = () => {
    if (!deleting) return;
    // later: DELETE /books/:id
    setBooks((prev) => prev.filter((b) => b._id !== deleting._id));
    toast.success(`"${deleting.title}" was removed.`);
    setDeleting(null);
  };

  if (books.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed py-20 text-center">
        <p className="text-muted-foreground">You have not added any books yet.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/add-book">Add Your First Book</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Cover</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Copies</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>
                  <div className="h-16 w-12 overflow-hidden rounded-md border">
                    <BookCover book={book} compact />
                  </div>
                </TableCell>
                <TableCell className="font-display text-base font-bold">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.copies}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setEditing(book)}
                    >
                      <Pencil className="mr-1 h-4 w-4" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-full"
                      onClick={() => setDeleting(book)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit modal */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Book</DialogTitle>
            <DialogDescription>Change anything you like, then save.</DialogDescription>
          </DialogHeader>
          {editing && (
            <EditForm
              key={editing._id}
              book={editing}
              onSave={handleSave}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm modal */}
      <Dialog open={!!deleting} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Delete this book?</DialogTitle>
            <DialogDescription>
              “{deleting?.title}” will be removed from the nook for good. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="rounded-full" onClick={() => setDeleting(null)}>
              Keep it
            </Button>
            <Button variant="destructive" className="rounded-full" onClick={handleDelete}>
              Yes, delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}