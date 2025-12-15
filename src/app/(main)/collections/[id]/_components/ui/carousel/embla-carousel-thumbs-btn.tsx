import Image from 'next/image'
import React from 'react'

type PropType = {
  selected: boolean
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick } = props

  return (
    <div
      className={
        'embla-thumbs__slide mr-16'.concat(
          selected ? ' embla-thumbs__slide--selected' : ''
        )
      }
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number relative w-40! h-28! overflow-hidden rounded-sm!"
      >
        <Image
          src="/images/ww.png"
          alt="watch"
          fill
          style={{ objectFit: 'cover' }}
          className="transform scale-105 transition-transform duration-200"
        />
      </button>
    </div>
  )
}
