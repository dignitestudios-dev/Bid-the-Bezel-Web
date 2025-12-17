import React, { Dispatch, SetStateAction } from "react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Repost from "@/components/icons/Repost";
import Link from "next/link";
type Props = {
  setRepostPopup: Dispatch<SetStateAction<boolean>>;
  repostPopup: boolean;
};

const RepostDialog = ({
  repostPopup,
  setRepostPopup,
}: Props) => {
  return (
    <Dialog open={repostPopup} onOpenChange={setRepostPopup}>
      <DialogContent className="md:max-w-lg  overflow-y-auto">
        <AlertDialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </AlertDialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white py-12 ">
          <Repost />
          <div className="text-center py-4 space-y-2">
            <h1 className="text-xl font-semibold">Repost</h1>
            <h4>3 watches remaining</h4>
          </div>
          <div className="w-full">
            <div className="flex w-full justify-center gap-4">
              <Button
                onClick={() => {
                  setRepostPopup(false);
                }}
                className="w-1/3 mt-4 py-4 bg-[#BA1818] text-white border "
              >
                Cancel
              </Button>
              <Link href={"/seller/auction-details"} className="w-1/3">
                <Button
                  onClick={() => {
                    setRepostPopup(false);
                  }}
                  className="w-full mt-4 py-4  bg-white text-black border"
                >
                  Edit
                </Button>
              </Link>
              <Link href={"/"} className="w-1/3">
                <Button
                  onClick={() => {
                    setRepostPopup(false);
                  }}
                  className="w-full mt-4 py-4 bg-[#0D1B2A] text-white "
                >
                  Repost
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

export default RepostDialog;
