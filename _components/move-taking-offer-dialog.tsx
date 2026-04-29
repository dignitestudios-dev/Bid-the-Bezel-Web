import React, { Dispatch, SetStateAction } from "react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import MoveTo from "@/components/icons/MoveTo";
import Link from "next/link";
type Props = {
  setMoveToTakingOffer: Dispatch<SetStateAction<boolean>>;
  moveToTakingOffer: boolean;
};

const MoveToTakingDialog = ({
  moveToTakingOffer,
  setMoveToTakingOffer,
}: Props) => {
  return (
    <Dialog open={moveToTakingOffer} onOpenChange={setMoveToTakingOffer}>
      <DialogContent className="md:max-w-lg  overflow-y-auto">
        <AlertDialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </AlertDialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white p-4 py-12 ">
          <MoveTo />
          <div className="text-center py-4 space-y-2">
            <h1 className="text-xl font-semibold">Move to taking offers?</h1>
            <h4>Your listing will up until you decide to remove it</h4>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-center gap-4">
              <Button
                onClick={() => {
                  setMoveToTakingOffer(false);
                }}
                className="w-[50%] mt-4 py-4 bg-gray-100 text-black border "
              >
                Close
              </Button>
              <Link href={"/"} className="w-[50%]">
                <Button
                  onClick={() => {
                    setMoveToTakingOffer(false);
                  }}
                  className="w-full mt-4 py-4  "
                >
                  Move
                </Button>
              </Link>
            </div>
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
  );
};

export default MoveToTakingDialog;
