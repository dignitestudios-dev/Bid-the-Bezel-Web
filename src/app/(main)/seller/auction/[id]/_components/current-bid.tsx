import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock3, Info } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const CurrentBid = (props: Props) => {
  return (
    <div className="rounded-xl w-full border border-[#E3E3E3]">
      <h1 className="bg-[#F7F7F7] rounded-t-xl flex font-semibold justify-center gap-2 border-b  border-[#E3E3E3]  py-4">
        {" "}
        <Clock3 color="#14A752" /> 2D 5H 42M <span className="font-medium">left</span>
      </h1>
      <div className="p-6 border-b border-[#E3E3E3]">
        <div className="flex justify-between mb-4 items-center">
          <h3 className=" font-semibold">Current Bid</h3>
          <h1 className="text-2xl font-semibold">$500.00</h1>
        </div>
        <div className="flex gap-2 items-start">
          <Image src={"/images/dp.png"} alt="dp" width={60} height={60} />
          <div className="my-2">
            <h1 className="font-semibold  mb-1">Guessmyusername</h1>
          <h5 className="text-xs">Bid 20m ago</h5>
          </div>
        </div>
      </div>
      <div className="px-6 pt-6 space-y-4">
        <h1 className=" font-semibold">Place your bid

           <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline"><Info />asd</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
        </h1>
        <div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold">$700.00</h1>
            <h3 className="text-xs">Your Bid</h3>
          </div>
        </div>
        <Button className="bg-[#415A77] w-full py-3">+200</Button>
      </div>
      <div className="flex items-center p-4 px-6 gap-2">
        <Input placeholder="Enter your amount"/>
        <Button className="text-sm px-20 py-3">Place Bid</Button>
      </div>
    </div>
  );
};

export default CurrentBid;
