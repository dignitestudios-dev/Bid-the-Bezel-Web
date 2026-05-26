"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { useGetAdvertisements } from "@/features/ads/hooks";

const WatchTosell = () => {
  const { data: adsData, isLoading } = useGetAdvertisements();

  const advertisements = adsData?.data?.advertisements || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // AUTO PLAY
  useEffect(() => {
    if (!emblaApi || advertisements.length <= 1) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, advertisements.length]);

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto p-12">
        <div className="h-[520px] rounded-xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (!advertisements.length) {
    return (
      <div className="max-w-screen-2xl mx-auto p-12">
        <div className="flex md:flex-row flex-col items-center justify-between bg-radial from-[#172f49] to-[#0D1B2A] rounded-xl overflow-hidden min-h-[520px]">
          {/* CONTENT */}
          <div className="md:w-1/2 p-6 md:p-12 space-y-8">
            <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold break-words">
              Have a watch to sell?
            </h1>

            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              Explore our curated collection of watches available for immediate
              purchase. Find the perfect timepiece to add to your collection
              today.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative md:w-1/2 w-full min-h-[300px] md:min-h-[520px]">
            <Image
              src="/images/watch.png"
              alt="watch"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-screen-2xl mx-auto p-12">
      <div className="relative">
        {/* EMBLA */}
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {advertisements.map((ad: any) => (
              <div key={ad?._id} className="min-w-0 shrink-0 grow-0 basis-full">
                <Link
                  href={ad?.metadata?.link || "#"}
                  target="_blank"
                  className="flex md:flex-row flex-col items-stretch justify-between bg-radial from-[#172f49] to-[#0D1B2A] overflow-hidden min-h-[520px]"
                >
                  {/* CONTENT */}
                  <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center space-y-8">
                    <h1 className="text-3xl md:text-7xl uppercase text-[#778DA9] font-semibold break-words">
                      {ad?.title}
                    </h1>

                    <p className="text-white/90 text-sm md:text-base leading-relaxed break-words">
                      {ad?.content}
                    </p>
                  </div>

                  {/* IMAGE */}
                  {/* IMAGE */}
                  {/* IMAGE */}
                  <div className="md:w-1/2 relative overflow-hidden min-h-[320px] md:min-h-[520px]">
                    <Image
                      src={ad?.image?.location}
                      alt={ad?.title || "Advertisement"}
                      fill
                      className="object-cover"
                      unoptimized
                      priority
                    />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* LEFT BUTTON */}
        <button
          onClick={scrollPrev}
          className="absolute cursor-pointer left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* RIGHT BUTTON */}
        <button
          onClick={scrollNext}
          className="absolute cursor-pointer right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* DOTS */}
      {advertisements.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {advertisements.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                selectedIndex === index
                  ? "bg-[#172f49] w-6"
                  : "bg-gray-300 w-2.5"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchTosell;
