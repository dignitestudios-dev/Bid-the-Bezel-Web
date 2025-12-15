import Aunctions from "./_components/auctions";
import BrowseByCategories from "./_components/browse-by-categories";
import FixedPrice from "./_components/fixed-price";
import Hero from "./_components/hero";
import Plans from "./_components/plans";
import TakingOffers from "./_components/taking-offers";
import WatchTosell from "./_components/watch-to-sell";

export default function Home() {
  return (
    <div>
      <Hero />
      <Aunctions />
      <FixedPrice />
      <TakingOffers />
      <BrowseByCategories/>
      <WatchTosell/>
      <Plans/>
    </div>
  );
}
