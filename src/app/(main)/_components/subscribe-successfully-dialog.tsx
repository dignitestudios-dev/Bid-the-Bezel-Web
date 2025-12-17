import React from "react";

type Props = {
  successPopup: boolean;
  setSuccessPopup: React.Dispatch<React.SetStateAction<boolean>>;
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Check } from "lucide-react";
const SubscribeSuccessfully = ({ successPopup, setSuccessPopup }: Props) => {
  return (
    <Dialog open={successPopup} onOpenChange={setSuccessPopup}>
      <DialogContent className="md:max-w-2xl  overflow-y-auto">
        <DialogHeader className="text-center hidden">
          <DialogTitle className="text-2xl  font-semibold">
            Buy Subscription
          </DialogTitle>
        </DialogHeader>
        <div className="w-full  rounded-xl flex flex-col items-center bg-white p-4 py-12 ">
            <div className="flex flex-col items-center">
<Image src={"/images/subscribe-confirm.png"} alt="subs" width={250} height={250} />
<div className="text-center space-y-5" >
    <h1 className="text-2xl font-semibold" >Subscribe to Basic Plan</h1>
    <div className="space-y-3 text-sm flex flex-col items-center">
        <span className="flex gap-2 items-center" ><Check color="#14A752" size={17} /> Includes a 3-days free trial</span>
        <span className="flex gap-2 items-center" ><Check color="#14A752" size={17} /> Can sell 1 watch per month</span>

    </div>
</div>
            </div>
          <Button
            onClick={() => setSuccessPopup(false)}
            className="w-[80%] mx-auto mt-4 py-4 bg-gray-100 text-black border "
          >
            Close
          </Button>
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

export default SubscribeSuccessfully;
