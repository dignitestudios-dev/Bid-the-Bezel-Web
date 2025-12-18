"use client";
import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import ProductCard from "../product-card";
import { cn } from "@/lib/utils";
import styles from "./style.module.css";

import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./embla-carousel-arrow-btn";
import {
  useSelectedSnapDisplay,
  SelectedSnapDisplay,
} from "./embla-carousel-selected-display";

type PropType = {
  slides: AuctionWatch[] | FixedPriceWatch[] | OfferWatch[];
  options?: EmblaOptionsType;
  FColor?: string;
  // isAuthenticated: boolean;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  FColor,
  // isAuthenticated,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section className={styles.embla}>
      <div
        className={styles.embla__viewport}
        ref={emblaRef}
        style={{ "--fade-color": FColor } as React.CSSProperties}
      >
        <div className={styles.embla__container}>
          {/* <div className={cn(styles.embla__slide, "md:block w-10! hidden")} /> */}
          {slides.map((w, index) => (
            <div
              className={cn(
                styles.embla__slide, // set min width for slides
                index === 0 ? "ml-2 md:ml-4" : "ml-2 md:ml-4" // extra left margin for first slide
              )}
              key={index}
            >
              <ProductCard prod={w} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />
      </div>
    </section>
  );
};

export default EmblaCarousel;
