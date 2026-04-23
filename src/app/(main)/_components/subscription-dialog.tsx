"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { useBuySubscription, useSubscription } from "@/features/subscription/hook"
import { PlanSkeleton } from "@/components/skeleton"
import { Loader2 } from "lucide-react"

type Props = {
  subsPopup: boolean
  setSubsPopup: React.Dispatch<React.SetStateAction<boolean>>
  setCardPopup: React.Dispatch<React.SetStateAction<boolean>>
  id:string
}

const SubscriptionsDialog = ({ subsPopup, setSubsPopup , setCardPopup , id }: Props) => {
   const {data , isLoading} = useSubscription()
   const { mutate: buySubscription } = useBuySubscription();
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleBuy = (planId: string) => {
    setLoadingPriceId(planId);
    const cleanUrl = `${window.location.origin}/auction/${id}?plan=success`;
    buySubscription(
      { planId, url: cleanUrl },
      {
        onSuccess: () => {
        },
        onSettled: () => setLoadingPriceId(null),
      },
    );
  };
  return (
    <Dialog open={subsPopup} onOpenChange={setSubsPopup}>
      <DialogContent className="max-w-6xl  overflow-y-auto">
        
        {/* Header */}
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
         
        </DialogHeader>

        {/* Plans */}
        <div className="space-y-6 px-2 pb-6">

          {/* Seller Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {isLoading
            ? [0, 1, 2].map((i) => <PlanSkeleton key={i} />)
            : data?.data
                ?.filter((item: any) => item?.type?.toLowerCase() !== "seller")
                .map((subs: any, index: number) => {
                  const isExecutive = subs?.name?.toLowerCase() === "executive";

                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        isExecutive
                          ? "h-[360px] border-2 border-[#9924BF] pt-20 relative"
                          : "h-80"
                      } gap-4 p-6 rounded-xl shadow-md border ${
                        isExecutive
                          ? "shadow-lg scale-105 z-10"
                          : "border-gray-300"
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
                        <h1 className="text-4xl font-bold">
                          ${subs?.metadata?.amount}
                        </h1>
                        <span className="text-sm mb-1 text-gray-500 capitalize">
                          {subs?.metadata?.watches} watch / per{" "}
                          {subs?.metadata?.interval}
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
            {/* Basic */}
         
         
          </div>

          {/* Buyer Package */}
          
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={() => setSubsPopup(false)}>
            Close
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionsDialog
