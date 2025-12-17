"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

type Props = {
  subsPopup: boolean
  setSubsPopup: React.Dispatch<React.SetStateAction<boolean>>
  setCardPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const SubscriptionsDialog = ({ subsPopup, setSubsPopup , setCardPopup }: Props) => {
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

            {/* Basic */}
            <div className="p-6 rounded-2xl border hover:shadow-lg transition">
              <h3 className="text-2xl font-bold">Basic</h3>
              <div className="flex items-center gap-3 mt-4">
                <p className="text-3xl font-bold">$99</p>
                <p className="text-sm text-gray-600">1 watch / month</p>
              </div>
              <Button onClick={()=>{setCardPopup(true); setSubsPopup(false) }} className="mt-4 w-full rounded-full bg-[#0f1b23]">
                Select Plan
              </Button>
              <div className="mt-4 space-y-2 text-sm">
                <p>✓ Includes a 3-days free trial</p>
                <p>✓ Can sell 1 watch per month</p>
              </div>
            </div>

            {/* Gold */}
            <div className="p-6 rounded-2xl border hover:shadow-lg transition">
              <h3 className="text-2xl font-bold">Gold</h3>
              <div className="flex items-center gap-3 mt-4">
                <p className="text-3xl font-bold">$149</p>
                <p className="text-sm text-gray-600">3 watches / month</p>
              </div>
              <Button onClick={()=>{setCardPopup(true); setSubsPopup(false) }} className="mt-4 w-full rounded-full bg-[#0f1b23]">
                Select Plan
              </Button>
              <div className="mt-4 space-y-2 text-sm">
                <p>✓ Includes a 3-days free trial</p>
                <p>✓ Can sell up to 3 watches per month</p>
              </div>
            </div>

            {/* Executive */}
            <div className="p-6 rounded-2xl border hover:shadow-lg transition relative">
              <span className="absolute top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                Popular
              </span>
              <h3 className="text-2xl font-bold">Executive</h3>
              <div className="flex items-center gap-3 mt-4">
                <p className="text-3xl font-bold">$199</p>
                <p className="text-sm text-gray-600">Unlimited / month</p>
              </div>
              <Button onClick={()=>{setCardPopup(true); setSubsPopup(false) }} className="mt-4 w-full rounded-full bg-[#0f1b23]">
                Select Plan
              </Button>
              <div className="mt-4 space-y-2 text-sm">
                <p>✓ Includes a 3-days free trial</p>
                <p>✓ Unlimited watch listings</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-2xl font-bold">Buy Package</h3>
                <div className="flex items-center gap-3 mt-4">
                  <p className="text-3xl font-bold">$99</p>
                  <p className="text-sm text-gray-600">1000 Bids / month</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>✓ 1000 Bids</p>
                <p>✓ Other options included</p>
              </div>
            </div>
            <Button onClick={()=>{setCardPopup(true); setSubsPopup(false) }} className="mt-4 w-full rounded-full bg-[#0f1b23]">
              Select Plan
            </Button>
          </div>
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
