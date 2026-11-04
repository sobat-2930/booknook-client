"use client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/mock-data";
import { useSession } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";
import { uploadToImgbb } from "@/lib/imgbb";
import type { Book, Category } from "@/lib/types";

export default function AddBookForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [category, setCategory] = useState<Category | "">("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const user = session?.user;

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    if (!category) {
      toast.error("Please choose a category.");
      return;
    }
    if (!file) {
      toast.error("Please upload a book cover image.");
      return;
    }

    setLoading(true);
    try {
      const imageUrl = await uploadToImgbb(file);

      await apiFetch<Book>("/books", {
        method: "POST",
        body: JSON.stringify({
          title: String(fd.get("title")),
          author: String(fd.get("author")),
          category,
          image: imageUrl,
          description: String(fd.get("description")),
          copies: Number(fd.get("copies")),
        }),
      });

      toast.success("Book added to the nook!");
      formRef.current?.reset();
      setCategory("");
      setFile(null);
      setPreview("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add the book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-8 rounded-2xl border bg-card p-6 shadow-sm md:grid-cols-[280px_1fr] md:p-10"
    >
      {/* Cover upload */}
      <div>
        <Label className="mb-2 block">Book Image</Label>
        <label
          htmlFor="cover"
          className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-foreground/30 bg-muted text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Cover preview" className="h-full w-full object-cover" />
          ) : (
            <>
              <ImagePlus className="h-8 w-8" />
              <span className="text-sm">Click to upload cover</span>
            </>
          )}
        </label>
        <input id="cover" type="file" accept="image/*" onChange={onFile} className="hidden" />
      </div>

      {/* Fields */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Book Title</Label>
          <Input id="title" name="title" required placeholder="e.g. The Alchemist" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input id="author" name="author" required placeholder="e.g. Paulo Coelho" />
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
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
          <Label htmlFor="copies">Total Copies</Label>
          <Input id="copies" name="copies" type="number" min={1} defaultValue={1} required />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="What is this book about, and why do you recommend it?"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input id="userName" value={user?.name ?? ""} readOnly className="bg-muted" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="userEmail">Your Email</Label>
          <Input id="userEmail" value={user?.email ?? ""} readOnly className="bg-muted" />
        </div>

        <div className="md:col-span-2">
          <Button type="submit" size="lg" disabled={loading} className="w-full rounded-full">
            {loading ? "Adding..." : "Add Book"}
          </Button>
        </div>
      </div>
    </form>
  );
}