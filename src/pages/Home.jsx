import HeroCarousel from "../components/home/HeroCarousel";
import CategoryCards from "../components/home/CategoryCards";
import RecentBills from "../components/home/RecentBills";

export default function Home() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <HeroCarousel />
      <CategoryCards />
      <RecentBills />
    </div>
  );
}
