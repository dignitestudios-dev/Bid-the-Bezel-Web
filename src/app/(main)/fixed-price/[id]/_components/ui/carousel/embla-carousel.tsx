"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { Thumb } from "./embla-carousel-thumbs-btn";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Slide = {
  location: string;
};

type PropType = {
  slides: Slide[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides = [], options }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    const index = emblaMainApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaThumbsApi.scrollTo(index);
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;

    onSelect();
    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaMainApi?.scrollTo(index);
    },
    [emblaMainApi]
  );

  if (!slides.length) return null;

  return (
    <div className="embla overflow-hidden">
      {/* MAIN */}

     <div className="embla__viewport overflow-hidden relative" ref={emblaMainRef}>
  <div className="embla__container flex">
    {slides?.map((item, index) => (
      <div className="embla__slide flex-[0_0_100%]" key={index}>
        <div className="relative w-full h-[500px]">
          <Image
            src={item?.location}
            alt="slide"
            fill
            className="object-cover rounded-lg"
            sizes="100vw"
            unoptimized
          />
        </div>
      </div>
    ))}
  </div>

  {/* LEFT BUTTON */}
  <button
    type="button"
    onClick={() => emblaMainApi?.scrollPrev()}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
  >
     <ArrowLeft size={16} />
  </button>

  {/* RIGHT BUTTON */}
  <button
    type="button"
    onClick={() => emblaMainApi?.scrollNext()}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
  >
   <ArrowRight size={16} />
  </button>
</div>

      {/* THUMBS */}
      <div className="embla-thumbs mt-4">
        <div
          className="embla-thumbs__viewport overflow-hidden"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container flex ml-[-8px]">
            {slides.map((item, index) => (
              <div
                key={index}
                className={`flex-[0_0_auto] w-fit  ${index === selectedIndex ? "opacity-100" : "opacity-50"
                  }`}
              >
                <Thumb
                  index={index}
                  selected={index === selectedIndex}
                  src={item?.location}
                  onClick={() => scrollTo(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;