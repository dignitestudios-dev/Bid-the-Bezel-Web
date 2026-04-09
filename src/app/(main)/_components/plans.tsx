"use client"
import { PlanSkeleton } from "@/components/skeleton";
import { useBuySubscription, useSubscription } from "@/features/subscription/hook";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Plans = (props: Props) => {
  const { data, isLoading } = useSubscription()
  const { mutate: buySubscription, isPending } = useBuySubscription()
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleBuy = (planId: string) => {
    setLoadingPriceId(planId);
    buySubscription(
      { planId, url: window.location.href },
      {
        onSettled: () => setLoadingPriceId(null),
      }
    );
  };
  return (
    <div className="py-12 max-w-screen-2xl mx-auto w-[92%]">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="uppercase text-4xl font-semibold">our plans</h1>
        <p className="text-sm text-center text-gray-600">
          Browse our three subscription tiers to find the perfect plan for
          selling your timepieces.
        </p>

        <div className="grid grid-cols-1 items-end md:grid-cols-3 gap-6 w-full">
          {isLoading ? (

            [0, 1, 2].map((i) => <PlanSkeleton key={i} />)
          ) : data?.data?.map((subs: any, index: number) => {
            const isExecutive = subs?.name?.toLowerCase() === "executive";

            return (
              <div
                key={index}
                className={`flex flex-col ${isExecutive ? "h-[360px] border-2 border-[#9924BF] pt-20 relative" : "h-80"
                  } gap-4 p-6 rounded-xl shadow-md border ${isExecutive ? "shadow-lg scale-105 z-10" : "border-gray-300"
                  }`}
              >

                {isExecutive && (
                  <div className="absolute top-0 left-0 right-0 bg-[#9924BF] text-white py-2 text-center rounded-t-md text-sm font-medium">
                    Popular
                  </div>
                )}

                <h3 className={`text-2xl font-semibold capitalize`}>
                  {subs?.name}
                </h3>

                <div className={`flex gap-2 items-end `}>
                  <h1 className="text-4xl font-bold">${subs?.metadata?.amount}</h1>
                  <span className="text-sm mb-1 text-gray-500 capitalize">
                    {subs?.metadata?.watches} watch / per {subs?.metadata?.interval}
                  </span>
                </div>

                <button
                  disabled={loadingPriceId === subs?._id}
                  onClick={() => handleBuy(subs?._id)}
                  className="w-full text-center cursor-pointer rounded-full py-5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPriceId === subs?._id ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    "Select Plan"
                  )}
                </button>

                {subs?.description?.map((item: any, i: number) => (
                  <div key={i} className="flex flex-col gap-3 mt-2">
                    <span className="flex items-center gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                          stroke="#14A752"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}


        </div>


      </div>
    </div>
  );
};

export default Plans;