import ListingCancel from '@/components/icons/ListingCancel'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    cancelSuccess:boolean;
setCancelSuccess: Dispatch<SetStateAction<boolean>>
}

const ConfirmCancel = ({setCancelSuccess , cancelSuccess}: Props) => {
  return (
   <Dialog open={cancelSuccess} onOpenChange={setCancelSuccess}>
      <DialogContent className="md:max-w-lg  overflow-y-auto">
        <AlertDialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </AlertDialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white  py-12 ">
            <ListingCancel/>
            <div className='text-center py-4 space-y-2'>
                <h1 className='text-xl font-semibold'>Listing Cancelled</h1>
                <h4>Your listing is cancelled</h4>
            </div>
            <div className='w-full'>
                <Link href={"/"} className='w-full mt-4 ' >
          <Button
            onClick={() => setCancelSuccess(false)}
            className="w-full py-4 bg-black text-white border "
          >
            Back to Home
          </Button>
          </Link>
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

export default ConfirmCancel