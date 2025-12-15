"use client";
import React, { useState } from "react";
import CollectionCard from "./ui/collection-card";
import { cn } from "@/lib/utils";
import Tabs from "./ui/tabs";
import Dropdown from "@/components/ui/dropdown";

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
  { label: "Under $500", value: "0-500" },
  { label: "$500 - $1000", value: "500-1000" },
  { label: "$1000 - $5000", value: "1000-5000" },
  { label: "Above $5000", value: "5000+" },
];

const Collections = (props: Props) => {
  const [filter, setFilter] = useState<"all" | "auction" | "fixed" | "offer">(
    "all"
  );
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
  return (
    <div className="max-w-screen-2xl mx-auto py-16 w-[90%]">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Tabs filter={filter} setFilter={setFilter} />
            <div className="flex items-center gap-4 ">
              <Dropdown
                options={brandOptions}
                placeholder="Brand"
                onSelect={setSelectedBrand}
                selected={selectedBrand}
              />
              <Dropdown
                options={brandOptions}
                placeholder="Brand"
                onSelect={setSelectedBrand}
                selected={selectedBrand}
              />
              <Dropdown
                options={priceOptions}
                placeholder="Price"
                onSelect={setSelectedPrice}
                selected={selectedPrice}
              />
            </div>
          </div>
          <Dropdown
            selected={selectedTrend}
            onSelect={setSelectedTrend}
            placeholder="Trending"
            options={trendOptions}
          />
        </div>
        <div className="flex flex-wrap gap-4 ">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <CollectionCard key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
