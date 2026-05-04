import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useConfirmBid } from '@/features/bidding/hooks'
import { showSuccess } from '@/lib/toast'
import Image from 'next/image'

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
  bidder: CurrentBidder;
  amount: number;
}

const ConfirmBidDialog = ({ open, setOpen, productId, bidder, amount }: Props) => {
  const { mutate: confirmBid, isPending } = useConfirmBid();

  const handleConfirm = () => {
    confirmBid(
      { id: productId },
      {
        onSuccess: () => {
          showSuccess('Bid confirmed successfully!');
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false} className="md:max-w-lg overflow-y-auto">
        <AlertDialogHeader className="hidden">
          <DialogTitle>Confirm Bid</DialogTitle>
        </AlertDialogHeader>
        <div className="w-full rounded-xl flex flex-col items-center bg-white ">
          {/* <h1 className="text-xl font-semibold mb-6">Confirm Bid?</h1> */}

          {/* Bidder profile */}
          <div className="flex items-center bg-[#F7F7F7] gap-4 w-full border rounded-xl p-4 mb-4">
            {bidder?.profilePicture?.location ? (
              <Image
                src={bidder.profilePicture.location}
                alt={bidder.userName}
                width={56}
                height={56}
                className="rounded-full object-cover w-14 h-14"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200" />
            )}
            <div>
              <p className="font-semibold">{bidder?.userName}</p>
              <p className="text-xs text-gray-500">Top bidder</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-bold">${amount?.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Current bid</p>
            </div>
          </div>

         <h1 className='text-xl font-bold pb-4'>Accept Bid</h1>

          <div className="flex justify-center gap-4 w-full">
            <Button
        variant={"dangerous"}
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="w-[50%] py-4  "
            >
              Cancel
            </Button>
            <Button
            variant={"success"}
              onClick={handleConfirm}
              disabled={isPending}
              className="w-[50%] py-4 "
            >
              {isPending ? 'Confirming...' : 'Confirm'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBidDialog;
