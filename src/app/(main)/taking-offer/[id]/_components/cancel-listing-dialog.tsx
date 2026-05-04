import ListingCancel from '@/components/icons/ListingCancel'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { deleteProduct } from '@/features/products/hook'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
  id:string;
    cancelListing:boolean;
setCancelListing: Dispatch<SetStateAction<boolean>>;
setCancelSuccess: Dispatch<SetStateAction<boolean>>
}

const CancelListingDialog = ({setCancelListing , id ,  cancelListing , setCancelSuccess}: Props) => {
   const {mutateAsync , isPending} = deleteProduct()
   const router = useRouter()
   const handleDelete = async () => {
  const res = await mutateAsync({ id });
  if (res?.success) {
    setCancelListing(false);
    router.replace("/")
  }
};
  return (
   <Dialog open={cancelListing} onOpenChange={setCancelListing}>
      <DialogContent className="md:max-w-lg  overflow-y-auto">
        <AlertDialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </AlertDialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white  ">
            <ListingCancel/>
                <div className='text-center'>
                <h1 className='text-xl font-semibold'>Cancel listing?</h1>
                <h4>Listing will be cancelled</h4>
            </div>
            <div className='flex justify-center w-full gap-4'>
          <Button
            onClick={() => {setCancelListing(false);}}
            disabled={isPending}
            className="mx-auto mt-4 py-4 w-[50%] bg-gray-100 text-black border "
          >
            Close
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isPending}
            variant={"dangerous"}
            className=" mx-auto mt-4 py-4 w-[50%]  "
          >
            Yes
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

export default CancelListingDialog