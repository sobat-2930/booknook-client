import SectionHeading from "@/components/common/SectionHeading";
import FadeIn from "@/components/common/FadeIn";

const steps = [
  { n: "01", title: "Add a book", text: "Share a book you own with a cover, a category and how many copies you have." },
  { n: "02", title: "Borrow a book", text: "Found something you like? Confirm the borrow and it's yours for a few days." },
  { n: "03", title: "Return a book", text: "Done reading? Hit return and the copy goes back on the shelf for others." },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-24">
      <SectionHeading
        eyebrow="Simple as 1-2-3"
        title="How Borrowing Works"
        subtitle="Three small steps between you and your next favourite read."
      />
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <FadeIn key={s.n} delay={i * 0.1} className="h-full">
            <div className="h-full rounded-2xl border border-dashed border-foreground/30 bg-card p-8">
              <span className="font-display text-5xl font-bold text-accent">{s.n}</span>
              <h3 className="mt-4 text-2xl font-bold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}