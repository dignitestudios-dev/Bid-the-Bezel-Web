import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock3 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const CurrentBid = (props: Props) => {
  return (
    <div className="rounded-xl w-full border border-[#E3E3E3]">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex justify-center gap-2 border-b  border-[#E3E3E3]  py-2">
        {" "}
        <Clock3 color="#14A752" /> 2D 5H 42M <span>left</span>
      </h1>
      <div className="p-4 border-b border-[#E3E3E3]">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">Current Bid</h3>
          <h1 className="text-2xl font-semibold">$500.00</h1>
        </div>
        <div className="flex gap-2 items-start">
          <Image src={"/images/dp.png"} alt="dp" width={50} height={50} />
          <div className="my-2">
            <h1 className="font-semibold text-xs mb-1">Guessmyusername</h1>
          <h5 className="text-xs">Bid 20m ago</h5>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <h1 className="text-sm font-semibold">Place your bid</h1>
        <div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">$700.00</h1>
            <h3 className="text-xs">Your Bid</h3>
          </div>
        </div>
        <Button className="bg-[#415A77] w-full">+200</Button>
      </div>
      <div className="flex items-center p-4 gap-2">
        <Input placeholder="Enter your amount"/>
        <Button className="text-sm px-20">Place Bid</Button>
      </div>
    </div>
  );
};

export default CurrentBid;
