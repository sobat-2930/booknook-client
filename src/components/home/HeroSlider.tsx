"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

interface Slide {
  eyebrow: string;
  title: string;
  text: string;
  stamp: string;
  bg: string;
  lines: [string, string, string];
}

const slides: Slide[] = [
  {
    eyebrow: "Welcome to BookNook",
    title: "Your neighbourhood library, now online",
    text: "Browse a growing shelf of stories, science and history shared by readers like you.",
    stamp: "OPEN DAILY",
    bg: "/hero/hero-1.avif",
    lines: ["The Midnight Library", "Matt Haig", "Fiction"],
  },
  {
    eyebrow: "Borrow with ease",
    title: "Pick a book. Keep it for a few days.",
    text: "One click to borrow, one click to return. No queues, no late-night paperwork.",
    stamp: "BORROWED",
    bg: "/hero/hero-2.avif",
    lines: ["Cosmos", "Carl Sagan", "Science"],
  },
  {
    eyebrow: "Share your shelf",
    title: "Got a book you love? Add it to the nook.",
    text: "List your favourites with a cover and a short note, and let others discover them.",
    stamp: "NEW ARRIVAL",
    bg: "/hero/hero-3.avif",
    lines: ["The Little Prince", "Antoine de Saint-Exupéry", "Kids"],
  },
];

const labels = ["Title", "Author", "Category"] as const;

export default function HeroSlider() {
  return (
    <section className="border-b">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div className="relative">
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${s.bg})` }}
              />

              {/* Balanced overlay: darker behind text (left), lighter on the right */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />

              <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent drop-shadow">
                    {s.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold leading-tight text-white drop-shadow-md md:text-6xl">
                    {s.title}
                  </h1>
                  <p className="mt-5 max-w-lg text-lg text-white/90 drop-shadow">{s.text}</p>
                  <Button asChild size="lg" className="mt-8 rounded-full">
                    <Link href="/books">Browse Books</Link>
                  </Button>
                </div>

                {/* Library card visual */}
                <div className="relative mx-auto hidden w-full max-w-sm md:block">
                  <div className="absolute inset-0 rotate-6 rounded-xl border bg-muted" />
                  <div className="relative -rotate-2 rounded-xl border-2 border-foreground/70 bg-card p-6 shadow-xl">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      Library Card
                    </p>
                    <div className="mt-5 space-y-4">
                      {labels.map((label, i) => (
                        <div key={label}>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {label}
                          </p>
                          <p className="border-b border-dashed border-foreground/40 pb-1 font-display text-lg">
                            {s.lines[i]}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="absolute -bottom-5 -right-4 rotate-12 rounded-md border-4 border-double border-primary px-3 py-1 font-display text-lg font-bold tracking-widest text-primary">
                      {s.stamp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}