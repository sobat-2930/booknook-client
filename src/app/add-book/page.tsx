import type { Metadata } from "next";
import PrivateRoute from "@/components/common/PrivateRoute";
import SectionHeading from "@/components/common/SectionHeading";
import AddBookForm from "@/components/forms/AddBookForm";

export const metadata: Metadata = { title: "Add Book" };

export default function AddBookPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-5xl px-4 py-16">
        <SectionHeading
          eyebrow="Share your shelf"
          title="Add a Book"
          subtitle="Fill in the details and your book joins the nook for everyone to borrow."
        />
        <AddBookForm />
      </section>
    </PrivateRoute>
  );
}