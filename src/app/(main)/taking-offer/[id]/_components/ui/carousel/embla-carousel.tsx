import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./embla-carousel-thumbs-btn";
import "./style.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
type PropType = {
  slides: {location: string}[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla">
      <div className="embla__viewport relative" ref={emblaMainRef}>
        <div className="embla__container">
          {slides.map((s,index) => (
            <div className="embla__slide" key={index}>
              {/* <div className="embla__slide__number">{index + 1}</div> */}
              <div className="relative w-full h-[500px]">
                {" "}
                {/* Adjust height as needed */}
                <Image
                  src={s.location}
                  alt="watch"
                  fill
                  style={{ objectFit: "contain" }}
                  className="rounded-lg" // optional, if you want rounded corners
                />
              </div>
            </div>
          ))}
        </div>
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

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((s, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                slide={s}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
