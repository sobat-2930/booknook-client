import Link from "next/link";
import { BookHeart, FlaskConical, Landmark, Baby, Sparkles } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import FadeIn from "@/components/common/FadeIn";

const cats = [
  { name: "Fiction", icon: BookHeart },
  { name: "Science", icon: FlaskConical },
  { name: "History", icon: Landmark },
  { name: "Kids", icon: Baby },
  { name: "Others", icon: Sparkles },
];

export default function TopCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24">
      <SectionHeading
        eyebrow="Find your shelf"
        title="Top Categories"
        subtitle="Jump straight to the kind of story you're in the mood for."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {cats.map(({ name, icon: Icon }, i) => (
          <FadeIn key={name} delay={i * 0.06} className="h-full">
            <Link
              href={`/books?category=${name}`}
              className="flex h-full flex-col items-center gap-3 rounded-2xl border bg-card p-6 text-center transition hover:-translate-y-1 hover:border-primary hover:shadow-md"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <span className="font-display text-lg font-bold">{name}</span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}