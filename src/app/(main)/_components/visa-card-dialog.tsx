import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Card from '@/components/icons/Card';
type Props = {
    visaCardPopup:boolean;
    setVisaCardPopup:React.Dispatch<React.SetStateAction<boolean>>
    // setCardPopup:React.Dispatch<React.SetStateAction<boolean>>
}

const VisaCardPopup = ({visaCardPopup , setVisaCardPopup }: Props) => {
  return (
     <Dialog open={visaCardPopup} onOpenChange={setVisaCardPopup}>
      <DialogContent className="md:max-w-2xl  overflow-y-auto">
        
        <DialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
         
        </DialogHeader>
 <div className="w-full  rounded-xl bg-white p-4 py-12 flex-1">
        <div className="space-y-4  w-full mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-full">
              <Card />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Credit Or Debit Card</h3>

             <Image src={"/images/visa.png"} alt="visa" width={80}  height={80}/>
            </div>
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl">
            <input
              type="text"
              placeholder="Name on Card"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-3 border-b gap-3">
              <input
                type="text"
                placeholder="Expiration"
                className="w-full px-4 py-3 col-span-2 border-r border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Zip code"
              className="w-full px-4 py-3  border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Save for later use</span>
          </label>


          <Button
            onClick={() => setVisaCardPopup(false)}
            className="w-full  bg-[#0f1b23] text-white "
          >
            Add Card
          </Button>
        </div>
      </div>
        {/* Footer
        <DialogFooter className="flex justify-end">
          <Button variant="outline" onClick={() => setCardPopup(false)}>
            Close
          </Button>
        </DialogFooter> */}

      </DialogContent>
    </Dialog>
  )
}

export default VisaCardPopup