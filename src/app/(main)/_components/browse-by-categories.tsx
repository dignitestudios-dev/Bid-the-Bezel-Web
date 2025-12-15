import Image from "next/image";
import React from "react";

type Props = {};

const img = [
  "rolex.png",
  "pp.png",
  "cartier.png",
  "iwc.png",
  "tudor.png",
  "omega.png",
];
const BrowseByCategories = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      <div className="space-y-6">
        <h2 className="font-semibold">Browse by Categories</h2>
        <div className="flex justify-between gap-5 items-center py-4 flex-wrap">
        {img.map((i, idx) => (
          <Image
            src={`/images/cat/${i}`}
            alt=""
            key={idx}
            width={200}
            height={200}
            className="p-6 border border-black/20 rounded-lg"
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByCategories;
