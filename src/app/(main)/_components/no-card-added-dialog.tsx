import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Image from 'next/image'
type Props = {
  cardPopup: boolean
  setCardPopup: React.Dispatch<React.SetStateAction<boolean>>
  setVisaCardPopup: React.Dispatch<React.SetStateAction<boolean>>
}


const NoCardAdded = ({cardPopup , setCardPopup , setVisaCardPopup}: Props) => {
   return (
    <Dialog open={cardPopup} onOpenChange={setCardPopup}>
      <DialogContent className="md:max-w-2xl  overflow-y-auto">
        
        <DialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
         
        </DialogHeader>
<div className='flex flex-col items-center gap-2' >
      <Image src={"/images/card.png"} alt='card' width={300} height={300} className='my-6' />

      <div className='text-center ' >
        <h1 className='text-2xl mb-2 font-semibold'>No Card Added</h1>
        <p>Add a card now to start bidding</p>
      </div>

      <Button onClick={()=>{setVisaCardPopup(true); setCardPopup(false)}} className='w-[80%]'>Add Now</Button>
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

export default NoCardAdded