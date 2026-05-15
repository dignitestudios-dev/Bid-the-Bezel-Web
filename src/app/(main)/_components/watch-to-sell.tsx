import { useGetAdvertisements } from "@/features/ads/hooks";
import { useMe } from "@/features/auth/hooks";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const WatchTosell = (props: Props) => {
  const { data: adsData, isLoading: adsLoading } = useGetAdvertisements();
  console.log(adsData)
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      {!adsLoading &&
        (adsData?.data && adsData?.data?.advertisements?.length > 0 ? (
        <Link target="_blank" href={`${adsData?.data?.advertisements[0].metadata.link}`} className="flex md:flex-row flex-col items-stretch justify-between bg-radial from-[#172f49] to-[#0D1B2A] rounded-xl overflow-hidden min-h-[520px]">
  
  {/* Content */}
  <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center space-y-8">
    <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold break-words">
      {adsData?.data?.advertisements[0].title}
    </h1>

    <p className="text-white/90 text-sm md:text-base leading-relaxed">
      {adsData?.data?.advertisements[0].content}
    </p>
  </div>

  {/* Image */}
  <div className="md:w-1/2 relative min-h-[300px] md:min-h-[420px] overflow-hidden">
    <Image
      src={adsData?.data?.advertisements[0].image.location}
      alt="watch"
      fill
      className="object-cover"
    />
  </div>
</Link>
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
