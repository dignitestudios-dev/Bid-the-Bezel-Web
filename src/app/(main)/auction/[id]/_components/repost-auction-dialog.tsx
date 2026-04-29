import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRelistAuction } from '@/features/products/hook'
import { showSuccess } from '@/lib/toast'
import Repost from '@/components/icons/Repost'

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  productId: string;
}

const DAYS_OPTIONS = [3, 5, 7];

const RepostAuctionDialog = ({ open, setOpen, productId }: Props) => {
  const { mutate: relist, isPending } = useRelistAuction();
  const [days, setDays] = useState<number>(3);

  const handleRelist = () => {
    relist(
      { id: productId, days },
      {
        onSuccess: () => {
          showSuccess('Auction relisted successfully!');
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:max-w-lg overflow-y-auto">
        <AlertDialogHeader className="hidden">
          <DialogTitle>Repost Auction</DialogTitle>
        </AlertDialogHeader>

        <div className="w-full rounded-xl flex flex-col items-center bg-white p-4 py-12">
          <Repost />

          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Repost Auction?</h1>
            <h4 className="text-gray-500 text-sm mt-1">
              Choose auction duration before reposting
            </h4>
          </div>

          {/* Hardcoded Days Selection */}
          <div className="flex gap-3 mt-6">
            {DAYS_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-4 py-2 rounded-md border text-sm font-medium transition ${
                  days === d
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 w-full mt-8">
            <Button
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="w-[50%] py-4 bg-gray-100 text-black border hover:bg-gray-200"
            >
              Cancel
            </Button>

            <Button
              onClick={handleRelist}
              disabled={isPending}
              className="w-[50%] py-4 bg-green-600 hover:bg-green-700 text-white"
            >
              {isPending ? 'Reposting...' : `Repost (${days} days)`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepostAuctionDialog;