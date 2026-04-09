"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useBuySubscription, useSubscription } from "@/features/subscription/hook"
import { X, Check, Loader2 } from "lucide-react"
import { useState } from "react"

export function ChangeSubscriptionModal({
    open,
    onClose,
    plans,
    currentPlan,
    onCancelSubscription
}: {
    open: boolean
    plans: any,
    onClose: (val: boolean) => void,
    currentPlan: any,
    onCancelSubscription: (id: string) => void
}) {
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
    console.log(plans, "plans")
    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent
                showCloseButton={false}
                className="
        w-[700px] max-w-[95vw]
        h-[625px]
        p-0
        bg-white
        border border-[#E3E3E3]
        rounded-xl
        flex flex-col
        "
            >
                <div className="flex items-center justify-between px-10 py-5 border-b">
                    <h2 className="text-2xl font-medium">
                        Change Subscription
                    </h2>

                    <button className="cursor-pointer" onClick={() => onClose(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-4 px-10 py-4 flex-1 overflow-y-auto">

                    <div className="flex items-center justify-between bg-[#F7F7F7] p-4 rounded-lg">
                        <div>
                            <p className="text-sm">Current Plan</p>
                            <p className="font-medium text-sm capitalize" >
                                {currentPlan?.plan?.name}
                            </p>
                        </div>

                        <p className="font-semibold">${currentPlan?.plan?.metadata?.amount}</p>

                        <button onClick={() => onCancelSubscription(currentPlan?._id)} className="border cursor-pointer px-4 py-2 rounded-full text-red-600 text-sm">
                            Cancel Subscription
                        </button>
                    </div>



                    <div className="grid grid-cols-2 gap-4">
                        {plans?.filter((subs: any) => subs.type !== "buyer")?.map((subs: any, index: number) => {
                            const isExecutive = subs?.name?.toLowerCase() === "executive";
                            return (
                                <div key={index} className={`p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition ${isExecutive ? "relative" : ""}`}>
                                    {isExecutive && (
                                        <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Popular
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold capitalize">{subs?.name}</h3>
                                    <div className="flex items-center gap-3 mt-4">
                                        <p className="text-3xl font-bold">${subs?.metadata?.amount}</p>
                                        <p className="text-sm text-gray-600 capitalize">  {subs?.metadata?.watches || subs?.metadata?.bids} watch / per {subs?.metadata?.interval}</p>
                                    </div>
                                    <Button
                                        disabled={
                                            loadingPriceId === subs?._id ||
                                            subs?._id === currentPlan?.plan?._id
                                        }
                                        onClick={() => handleBuy(subs?._id)}
                                        className="mt-4 w-full rounded-full bg-[#0f1b23] text-white"
                                    >
                                        {loadingPriceId === subs?._id ? (
                                            <Loader2 className="animate-spin mx-auto" />
                                        ) : (
                                            "Select Plan"
                                        )}
                                    </Button>
                                    {subs?.description?.map((des: any) => (
                                        <div className="mt-4 space-y-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-700">
                                                <span className="text-green-600">✓</span>
                                                <span>{des}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            )
                        })}
                    </div>


                </div>


                <div className="flex justify-end gap-3 px-10 py-4 border-t">
                    <button className="px-6 py-2 rounded-full border bg-[#F7F7F7]">
                        Cancel
                    </button>

                    <button className="px-6 py-2 rounded-full bg-[#0D1B2A] text-white">
                        Save
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    )
}