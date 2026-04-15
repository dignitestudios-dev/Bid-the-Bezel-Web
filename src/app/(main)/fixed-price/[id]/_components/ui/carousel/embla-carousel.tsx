"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { Thumb } from "./embla-carousel-thumbs-btn";
import Image from "next/image";

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

      <div className="embla__viewport overflow-hidden" ref={emblaMainRef}>
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
      </div>

      {/* THUMBS */}
      <div className="embla-thumbs mt-4">
        <div
          className="embla-thumbs__viewport overflow-hidden"
          ref={emblaThumbsRef}
        >
          <div className="embla-thumbs__container flex gap-3">
            {slides.map((item, index) => (
              <div
                key={index}
                className={`flex-[0_0_auto] ${index === selectedIndex ? "opacity-100" : "opacity-50"
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