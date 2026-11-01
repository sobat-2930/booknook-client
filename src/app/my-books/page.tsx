import type { Metadata } from "next";
import PrivateRoute from "@/components/common/PrivateRoute";
import SectionHeading from "@/components/common/SectionHeading";
import MyBooksTable from "@/components/books/MyBooksTable";

export const metadata: Metadata = { title: "My Books" };

export default function MyBooksPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Your contributions"
          title="My Books"
          subtitle="Books you have added. Edit the details or remove them anytime."
        />
        <MyBooksTable />
      </section>
    </PrivateRoute>
  );
}