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
import {
  allWatches,
  auctionWatches,
  fixedPriceWatches,
  offerWatches,
} from "@/lib/constants";
import { useGetListing } from "@/features/listing/hook";
import { ListingSkeleton } from "@/components/skeleton";
import Pagination from "../../fixed-price/[id]/_components/pagination";
import { Button } from "@/components/ui/button";

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
  const [page, setPage] = useState(1);

  const [authFilter, setAuthFilter] = useState<string | undefined>();
  const [priceRange, setPriceRange] = useState<{
    min?: number;
    max?: number;
  }>({});
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const watchCategory = searchParams.get("category") as WatchCategory;

  const [categorizedWatches, setCategorizedWatches] =
    useState<any[]>(allWatches);

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

  const hasActiveFilters = selectedBrands.length > 0 || authFilter || priceRange.min !== undefined || priceRange.max !== undefined;

  const handleClearAllFilters = () => {
    setSelectedBrands([]);
    setAuthFilter(undefined);
    setPriceRange({});
    setPage(1);
  };

  const handleSetFilter = (category: WatchCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category);
    router.push(`/collections?${params.toString()}`);
    setFilter(category);
    setPage(1)
  };

  useEffect(() => {
    if (
      watchCategory &&
      ["all", "auction", "fixed", "offer"].includes(watchCategory)
    ) {
      watchCategory === "all"
        ? setCategorizedWatches(allWatches)
        : watchCategory === "auction"
          ? setCategorizedWatches(auctionWatches)
          : watchCategory === "fixed"
            ? setCategorizedWatches(fixedPriceWatches)
            : watchCategory === "offer"
              ? setCategorizedWatches(offerWatches)
              : setCategorizedWatches(allWatches);
      setFilter(watchCategory);
    }
  }, [watchCategory]);

  const categoryToApiType: Record<WatchCategory, string | undefined> = {
    all: undefined,
    auction: "auction",
    fixed: "fixed_price",
    offer: "taking_offers",
  };
  const apiType = categoryToApiType[watchCategory || "all"];

  const { data: ProductData, isLoading } = useGetListing(
    apiType,
    authFilter,
    priceRange.min,
    priceRange.max,
    page,
    selectedBrands)
  const pagination = ProductData?.pagination

  return (
    <div className="max-w-screen-2xl mx-auto py-16 w-[90%]">
      <div className="space-y-8">
        <div className="flex justify-between items-center flex-wrap gap-3 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-5 lg:gap-8 flex-wrap">
            <Tabs filter={filter} setFilter={handleSetFilter} />
            <div className="flex items-center gap-2 sm:gap-4">
              <BrandFilterDialog onApply={(brands) => {
                setSelectedBrands(brands);
                setPage(1);
              }} />
              <PriceFilterDialog
                type={apiType}
                onApply={(min, max) => setPriceRange({ min, max })}
              />
              <AuthFilterDialog
              type={apiType || ""}
                onApply={setAuthFilter}
                productLength={ProductData?.data || []} />
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={handleClearAllFilters}
                  className="border-2 py-2 rounded-xl text-sm"
                >
                  Clear All
                </Button>
              )}
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
          {isLoading ? (
            // <div className="" >
            <>
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
              <ListingSkeleton />
            </>
          )
            : ProductData?.data?.length === 0 ? (
              <div className="col-span-full flex items-center justify-center text-center py-10">
                No Product Found
              </div>
            ) : ProductData?.data?.map((watch: any, idx: number) => (
              <CollectionCard key={idx} watch={watch} />
            ))}
        </div>
        {!isLoading && ProductData?.data?.length !== 0 && (

          <Pagination
            page={page}
            pagination={pagination}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default Collections;
