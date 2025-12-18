"use client";
import React, { useEffect, useState } from "react";
import CollectionCard from "./ui/collection-card";
import { cn } from "@/lib/utils";
import Tabs from "./ui/tabs";
import Dropdown from "@/components/ui/dropdown";
import { useRouter, useSearchParams } from "next/navigation";
import BrandFilterDialog from "./ui/brand-filter-dialog";
import PriceFilterDialog from "./ui/price-filter-dialog";
import AuthFilterDialog from "@/components/auth-filter-dialog";

type WatchCategory = "all" | "auction" | "fixed" | "offer";
type Props = {};
const brandOptions = [
  { label: "Rolex", value: "rolex" },
  { label: "Omega", value: "omega" },
  { label: "Tag Heuer", value: "tag" },
  { label: "Seiko", value: "seiko" },
];

const priceOptions = [
  { label: "Under $500", value: "0-500" },
  { label: "$500 - $1000", value: "500-1000" },
  { label: "$1000 - $5000", value: "1000-5000" },
  { label: "Above $5000", value: "5000+" },
];
const trendOptions = [
  { label: "Top Trend", value: "top-trend" },
  { label: "Most Popular", value: "most-popular" },
];

const Collections = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const watchCategory = searchParams.get("category") as WatchCategory;

  const [filter, setFilter] = useState<WatchCategory>("all");
  const [selectedBrand, setSelectedBrand] = useState<{
    label: string;
    value: string | number;
  }>();
  const [selectedPrice, setSelectedPrice] = useState<{
    label: string;
    value: string | number;
  }>();
  const [selectedTrend, setSelectedTrend] = useState<{
    label: string;
    value: string | number;
  }>();

  const handleSetFilter = (category: WatchCategory) => {
    router.push(`/collections?category=${category}`);
    setFilter(category);
  };

  useEffect(() => {
    if (
      watchCategory &&
      ["all", "auction", "fixed", "offer"].includes(watchCategory)
    ) {
      setFilter(watchCategory);
    }
  }, [watchCategory]);

  return (
    <div className="max-w-screen-2xl mx-auto py-16 w-[90%]">
      <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-3 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-8 flex-wrap">
            <Tabs filter={filter} setFilter={handleSetFilter} />
            <div className="flex items-center gap-2 sm:gap-4">
              <BrandFilterDialog />
              <PriceFilterDialog />
              <AuthFilterDialog />
            </div>
          </div>
          <Dropdown
            selected={selectedTrend}
            onSelect={setSelectedTrend}
            placeholder="Trending"
            options={trendOptions}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
            <CollectionCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
