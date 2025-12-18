import Badge from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
  imageSrc?: string;
  title?: string;
  badgeTitle?: string;
  startingPrice?: string | number;
  currentBid?: string | number;
  endsIn?: string;
};

const HeroCard = ({
  imageSrc = "/images/hero-card.png",
  title = "2021 Rolex Datejust 41",
  badgeTitle = "Authenticated",
  startingPrice = "$8700",
  currentBid = "$14200",
  endsIn = "2D 5H 42M",
}: Props) => {
  return (
    <div>
      <div className=" text-xs md:text-base p-4 rounded-xl bg-gray-200/30 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <div className="relative">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image src={imageSrc} alt="card" fill className="object-cover" />
          </div>
        </div>

        <div className="pt-4">
          <h1 className="flex items-center gap-2">
            <span className="font-semibold text-lg">{title}</span>

            <Badge
              className={cn(
                "bg-linear-to-r from-[#0D1B2A] text-white py-1 px-4 text-sm to-[#415A77]"
              )}
              title={badgeTitle}
            />
          </h1>

          <div className="flex text-center items-center justify-between py-4">
            <div className="w-1/3">
              <h2 className="font-thin">Starting Price</h2>
              <h1 className="font-semibold">{startingPrice}</h1>
            </div>

            <div className="h-10 w-px bg-white/50" />

            <div className="w-1/3">
              <h2 className="font-thin">Current Bid</h2>
              <h1 className="font-semibold">{currentBid}</h1>
            </div>

            <div className="h-10 w-px bg-white/50" />

            <div className="w-1/3">
              <h2 className="font-thin">Ends In</h2>
              <h1 className="font-semibold">{endsIn}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
