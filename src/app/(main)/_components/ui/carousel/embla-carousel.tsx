"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import "./style.css"
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './embla-carousel-arrow-btn'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './embla-carousel-selected-display'
import useEmblaCarousel from 'embla-carousel-react'
import AuctionCard from '../aunction-card'
import { cn } from '@/lib/utils'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  FColor?:string;
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <section className={cn("embla")}>
      <div className="embla__viewport" ref={emblaRef}  style={{ "--fade-color": `${props.FColor}` } as React.CSSProperties}>
        <div className="embla__container ">
          <div className='embla__slide md:block hidden' />
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              {/* <div className="embla__slide__number">{index + 1}</div> */}
              <AuctionCard/>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        {/* <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        /> */}
      </div>
    </section>
  )
}

export default EmblaCarousel
