import { Button } from "@/components/ui/button";
import { ShieldCheck, ShieldX } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
};

const Authenticate = ({  }: Props) => {
  return (
    <div className="h-screen flex md:flex-row flex-col gap-4 justify-center items-center">
      <div className="w-[400px] h-[400px] p-5 rounded-xl bg-white shadow-lg flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          <ShieldCheck
            fill="#14A752"
            stroke="white"
            size={45}
            className="my-2"
          />
          <h1 className=" font-semibold text-lg">Authenticate your watch</h1>
          <p className="text-sm text-center">
            Send your watch to us so we can authenticate for you. A $200 fees
            will be charged to authenticate your watch
          </p>
        </div>
        <Link className="w-full"  href={"shipping-details-auth"}>
        <Button className="w-full" >Authenticate Now</Button>
      </Link></div>
      <div className="w-[400px] h-[400px] p-5 rounded-xl bg-white shadow-lg flex flex-col justify-between items-center">
        <div className="flex flex-col items-center gap-4">
          <ShieldX
            fill="#BA1818"
            stroke="white"
            size={45}
            className="my-2"
          />
          <h1 className=" font-semibold text-lg">Continue without authenticating</h1>
          <p className="text-sm text-center">
            Without authentication, your watch won't have our verified badge, and buyers may not trust your listing.
          </p>
        </div>
        <Link className="w-full"  href={"watch-listed"}>
        <Button className="text-red-600 w-full bg-gray-100">Continue without authenticating</Button>
      </Link></div>
    </div>
  );
};

export default Authenticate;
