import Image from 'next/image'
import React from 'react'

type PropType = {
  selected: boolean;
  index: number;
  onClick: () => void;
  src: string;
};

export const Thumb: React.FC<PropType> = ({
  selected,
  onClick,
  src,
}) => {
  console.log(src, "")
  return (
    <div
      className={
        "embla-thumbs__slide mr-16".concat(
          selected ? " embla-thumbs__slide--selected" : ""
        )
      }
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number relative w-40 h-28 overflow-hidden rounded-sm"
      >
        <Image
          src={src || "/images/fav.jpg"}
          alt="thumb"
          fill
          className="object-cover"
          unoptimized
        />
      </button>
    </div>
  );
};
