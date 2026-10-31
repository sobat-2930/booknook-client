import HeroSlider from "@/components/home/HeroSlider";
import NewArrivals from "@/components/home/NewArrivals";
import HowItWorks from "@/components/home/HowItWorks";
import TopCategories from "@/components/home/TopCategories";
import { mockBooks } from "@/lib/mock-data";

export default function Home() {
  // later: fetch latest 6 books from the Express server
  return (
    <>
      <HeroSlider />
      <NewArrivals books={mockBooks} />
      <HowItWorks />
      <TopCategories />
    </>
  );
}