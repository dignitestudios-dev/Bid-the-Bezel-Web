"use client";
import Image from "next/image";
import React, { useState } from "react";

type Props = {};

const CollectionCard = (props: Props) => {
  const [isFav, setIsFav] = useState(false);
  return (
    <div className="bg-[#F7F7F7]  border border-gray-200 rounded-xl p-4 w-[330px] h-[400xp]">
      <div className="relative w-full">
        <div className="rounded-full absolute top-2 left-2 text-white bg-black/40 px-3 py-1 text-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
          Authenticated
        </div>
        <div className="rounded-tl-sm absolute bottom-0 right-0 p-3 text-center text-white bg-black/10 px-3 text-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-br-xl">
          <h2>Ends In</h2>
          <h1 className="font-semibold">2D 5H 42M</h1>
        </div>
        <Image
          src={"/images/watch.png"}
          alt="img"
          className="bg-contain w-full rounded-xl"
          width={500}
          height={500}
        />
      </div>
      <div className="pt-4">
        <h1 className="text-lg font-semibold mb-2">Omega Seamaster 300</h1>
        <div className="flex justify-between gap-4">
          <div>
            <h2 className="text-sm">Starting Price</h2>{" "}
            <h1 className="font-semibold text-lg">$8700</h1>
          </div>
          <div className="w-px bg-gray-400 " />
          <div>
            <h2 className="text-sm">Starting Price</h2>{" "}
            <h1 className="font-semibold text-lg">$8700</h1>
          </div>
          <div className="">
            <button
              onClick={() => setIsFav(!isFav)}
              className={` w-10 h-10 rounded-lg flex items-center justify-center 
                    bg-white/30  transition-all duration-300
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
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
