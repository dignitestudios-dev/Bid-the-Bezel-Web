import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    isFav:boolean;
    setIsFav: Dispatch<SetStateAction<boolean>>
}

const FavBtn = ({isFav , setIsFav}: Props) => {
  return (
     <div className="">
                    <button
                      onClick={() => setIsFav(!isFav)}
                      className={` w-10 h-10 rounded-lg flex items-center justify-center 
                      bg-[#F7F7F7] backdrop-blur-md shadow-md transition-all duration-300
                      ${isFav ? "scale-110" : "scale-100"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={isFav ? "red" : "none"}
                        viewBox="0 0 24 24"
                        stroke="red"
                        strokeWidth={1}
                        className={`w-7 h-7 transition-all duration-300 ${
                          isFav ? "animate-ping-once" : ""
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                  </div>
  )
}

export default FavBtn