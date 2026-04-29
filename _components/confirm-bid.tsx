import React, { Dispatch, SetStateAction } from "react";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
type Props = {
  setConfirmBidPopup: Dispatch<SetStateAction<boolean>>;
  confirmBidPopup: boolean;
};

const ConfirmBid = ({ setConfirmBidPopup, confirmBidPopup }: Props) => {
  return (
    <Dialog open={confirmBidPopup} onOpenChange={setConfirmBidPopup}>
      <DialogContent className="md:max-w-lg  overflow-y-auto">
        <AlertDialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </AlertDialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white  py-12 ">
          <div className="flex justify-between bg-[#F7F7F7] rounded-xl items-center p-5 gap-3 w-full">
            <div className="flex w-full bg-[#F7F7F7] rounded-xl items-center gap-3 ">
              <Image src={"/images/dp.png"} alt="al" width={60} height={60} />
              <div>
                <h1 className="font-semibold ">GuessMyname</h1>
                <h5 className="text-xs">Bid 20m ago</h5>
              </div>
            </div>{" "}
            <h1 className="text-xl font-semibold">$500.00</h1>{" "}
          </div>
          <h1 className="text-xl font-semibold py-8">Accept Bid</h1>
          <div className="w-full">
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  setConfirmBidPopup(false);
                  //   setConfirmBidPopup(true);
                }}
                className="w-[50%] py-4 bg-red-700 text-white border "
              >
                Cancel
              </Button>
              <Link href={"/buyer/shipping-details"} className="w-[50%]">
                <Button
                  onClick={() => {
                    setConfirmBidPopup(false);
                  }}
                  className="w-full  py-4 bg-gray-100 text-green-500 border "
                >
                  Confirm
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

export default ConfirmBid;
