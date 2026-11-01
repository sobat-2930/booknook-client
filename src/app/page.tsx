import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import { mockBooks } from "@/lib/mock-data";

export default function Home() {
  // later: fetch latest 6 books from the server (sort by createdAt desc, limit 6)
  const latest = [...mockBooks]
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 6);

  return (
    <>
      <HeroSlider />
      <NewArrivals books={latest} />
      <HowItWorks />
      <TopCategories />
    </>
  );
}