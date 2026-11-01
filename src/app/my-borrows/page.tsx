import type { Metadata } from "next";
import PrivateRoute from "@/components/common/PrivateRoute";
import SectionHeading from "@/components/common/SectionHeading";
import MyBorrowsTable from "@/components/books/MyBorrowsTable";

export const metadata: Metadata = { title: "My Borrows" };

export default function MyBorrowsPage() {
  return (
    <PrivateRoute>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionHeading
          eyebrow="Currently reading"
          title="My Borrows"
          subtitle="Books you have borrowed. Return them when you are done."
        />
        <MyBorrowsTable />
      </section>
    </PrivateRoute>
  );
}