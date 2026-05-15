import { useGetAdvertisements } from "@/features/ads/hooks";
import { useMe } from "@/features/auth/hooks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const WatchTosell = (props: Props) => {
  const { data: adsData, isLoading: adsLoading } = useGetAdvertisements();
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      {!adsLoading &&
        (adsData?.data && adsData?.data?.advertisements?.length > 0 ? (
          <div className="flex md:flex-row flex-col items-center justify-between bg-radial from-[#172f49] to-[#0D1B2A] rounded-xl">
            <div className=" md:w-[50%] p-6 md:p-12 space-y-8">
              <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold">
               {adsData?.data?.advertisements[0].title}
              </h1>
              <p className="text-white/90 ">
                 {adsData?.data?.advertisements[0].content}
              </p>
              
            </div>
            <div className="">
              <Image
                src={adsData?.data?.advertisements[0].image.location}
                alt="watch"
                width={700}
                height={700}
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="flex md:flex-row flex-col items-center justify-between bg-radial from-[#172f49] to-[#0D1B2A] rounded-xl">
            <div className=" md:w-[50%] p-6 md:p-12 space-y-8">
              <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold">
                Have a watch to sell?
              </h1>
              <p className="text-white/90 ">
                Explore our curated collection of watches available for
                immediate purchase. Find the perfect timepiece to add to your
                collection today.
              </p>
              =
            </div>
            <div className="">
              <Image
                src={"/images/watch.png"}
                alt="watch"
                width={700}
                height={700}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default WatchTosell;
