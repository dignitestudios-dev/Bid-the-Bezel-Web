import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldX } from "lucide-react";
import React from "react";

type Props = {
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const Authenticate = ({ setCurrentStep }: Props) => {
  return (
    <div className="h-screen flex md:flex-row flex-col gap-4 justify-center items-center">
      <div className="w-[400px] h-[400px] p-5 rounded-xl bg-white shadow-lg flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          <ShieldCheck
            fill="#14A752"
            stroke="white"
            size={35}
            className="my-2"
          />
          <h1 className=" font-semibold text-lg">Authenticate your watch</h1>
          <p className="text-sm">
            Send your watch to us so we can authenticate for you. A $200 fees
            will be charged to authenticate your watch
          </p>
        </div>
        <Button className="w-full" onClick={()=>setCurrentStep("shipping")}>Authenticate Now</Button>
      </div>
      <div className="w-[400px] h-[400px] p-5 rounded-xl bg-white shadow-lg flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          <ShieldX
            fill="red"
            stroke="white"
            size={35}
            className="my-2"
          />
          <h1 className=" font-semibold text-lg">Authenticate your watch</h1>
          <p className="text-sm">
            Send your watch to us so we can authenticate for you. A $200 fees
            will be charged to authenticate your watch
          </p>
        </div>
        <Button className="text-red-600 w-full bg-gray-100" onClick={()=>setCurrentStep("watch-listed")}>Continue without authenticating</Button>
      </div>
    </div>
  );
};

export default Authenticate;
