import Card from "@/components/icons/Card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const AddCard = ({
  // setCurrentStep,
}: {
  // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
}) => {
  return (
    <div className="flex md:flex-row flex-col w-full items-center md:items-start gap-12 space-y-6 py-12 md:h-screen">
      <div className="md:w-[50%] flex justify-center items-center">

        <div className="p-8 rounded-2xl border w-full h-full shadow-xl">
          <h3 className="text-2xl font-bold">Basic</h3>
          <div className="flex items-baseline gap-2 mt-10">
            <p className="text-4xl font-bold">$99</p>
            <p className="text-sm text-gray-600">1 watch / per Month</p>
          </div>
                <div className="mt-10 space-y-5">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Includes a 3-days free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Can sell 1 watch per month</span>
              </div>
            </div>
        </div>
      </div>

      <div className="w-full border rounded-xl bg-white p-4 py-12 flex-1">
        <div className="space-y-4  w-full mx-auto">
          <div className="flex items-center gap-3">
            <div className="h-full">
              <Card />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Credit Or Debit Card</h3>

             <Image src={"/images/visa.png"} alt="visa" width={80}  height={80}/>
            </div>
            <div className="ml-auto">
              <div className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl">
            <input
              type="text"
              placeholder="Name on Card"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="w-full px-4 py-3 border-b border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-3 border-b gap-3">
              <input
                type="text"
                placeholder="Expiration"
                className="w-full px-4 py-3 col-span-2 border-r border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-4 py-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Zip code"
              className="w-full px-4 py-3  border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-sm text-gray-700">Save for later use</span>
          </label>

<Link href={"sale-type"} className="w-full">
          <Button
            // onClick={() => setCurrentStep("subscription-confirmation")}
            className="w-full  bg-[#0f1b23] text-white "
          >
            Buy Plan
          </Button>
      </Link>  </div>
      </div>
    </div>
  );
};

export default AddCard;
