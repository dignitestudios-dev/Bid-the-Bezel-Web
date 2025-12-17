"use client"
import React, { useCallback, useEffect, useState } from "react"
import { EmblaCarouselType } from "embla-carousel"
import styles from "./style.module.css"

type UseSelectedSnapDisplayType = { selectedSnap: number; snapCount: number }

export const useSelectedSnapDisplay = (emblaApi: EmblaCarouselType | undefined): UseSelectedSnapDisplayType => {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((api: EmblaCarouselType) => {
    setSnapCount(api.scrollSnapList().length)
    setSelectedSnap(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    updateScrollSnapState(emblaApi)
    emblaApi.on("select", updateScrollSnapState)
    emblaApi.on("reInit", updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return { selectedSnap, snapCount }
}

type PropType = { selectedSnap: number; snapCount: number }

export const SelectedSnapDisplay: React.FC<PropType> = ({ selectedSnap, snapCount }) => {
  return <div className={styles.embla__selectedSnapDisplay}></div>
}
