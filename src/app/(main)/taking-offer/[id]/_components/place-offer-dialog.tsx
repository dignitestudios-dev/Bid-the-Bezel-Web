import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  amount: number;
  user: any;
  isPending: boolean;
  onConfirm: () => void;
}

const PlaceOfferDialog = ({ open, setOpen, amount, user, isPending, onConfirm }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-lg overflow-y-auto">
        <AlertDialogHeader className="hidden">
          <DialogTitle>Confirm Offer</DialogTitle>
        </AlertDialogHeader>
        <div className="w-full rounded-xl flex flex-col items-center bg-white p-4 py-8">
          <h1 className="text-xl font-semibold mb-6">Confirm Your Offer?</h1>
          <div className="flex items-center gap-4 w-full border rounded-xl p-4 mb-4">
            {user?.profilePicture?.location ? (
              <Image
                src={user.profilePicture.location}
                alt={user.userName}
                width={56}
                height={56}
                className="rounded-full object-cover w-14 h-14"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200" />
            )}
            <div>
              <p className="font-semibold">{user?.userName}</p>
              <p className="text-xs text-gray-500">Your offer</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-2xl font-bold">${amount?.toFixed(2)}</p>
              <p className="text-xs text-gray-500">Amount</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center mb-6">
            10% of your offer amount will be held in escrow
          </p>
          <div className="flex gap-4 w-full">
            <Button
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="w-[50%] py-4 bg-gray-100 text-black border hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isPending}
              className="w-[50%] py-4 bg-green-600 hover:bg-green-700 text-white"
            >
              {isPending ? 'Placing...' : 'Confirm'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceOfferDialog;
