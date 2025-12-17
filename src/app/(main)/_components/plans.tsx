import Link from "next/link";
import React from "react";

type Props = {};

const Plans = (props: Props) => {
  return (
    <div className="py-12 max-w-screen-2xl mx-auto w-[92%]">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="uppercase text-4xl font-semibold">our plans</h1>
        <p className="text-sm text-center text-gray-600">
          Browse our three subscription tiers to find the perfect plan for
          selling your timepieces.
        </p>
        
        <div className="grid grid-cols-1 items-end md:grid-cols-3 gap-6 w-full">
          <div className="flex flex-col h-80 gap-4 p-6 rounded-xl shadow-md border border-gray-300">
            <h3 className="text-2xl font-semibold">Basic</h3>
            <div className="flex gap-2 items-end">
              <h1 className="text-4xl font-bold">$99</h1>
              <span className="text-sm mb-1 text-gray-500">1 watch / per Month</span>
            </div>
            <Link href={"/seller/add-card"} className="w-full text-center rounded-full py-5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Select Plan
            </Link>
            <div className="flex flex-col gap-3 mt-2">
              <span className="flex items-center  gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Includes a 3-days free trial
              </span>
              <span className="flex items-center  gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Can sell 1 watch per month
              </span>
            </div>
          </div>

          {/* Executive Plan - Popular */}
            <div className="flex flex-col h-[360px] gap-4 p-6 rounded-xl shadow-lg border-2 border-[#9924BF] relative overflow-visible pt-20">
            <div className="absolute -top-0 left-0 right-0 bg-[#9924BF] text-white py-2 text-center rounded-t-md text-sm font-medium">
              Popular
            </div>
            <h3 className="text-2xl font-semibold">Executive</h3>
            <div className="flex gap-2 items-end">
              <h1 className="text-4xl font-bold">$199</h1>
              <span className="text-sm mb-1 text-gray-500">Unlimited watches / per Month</span>
            </div>
            <Link href={"/seller/add-card"} className="w-full text-center rounded-full py-5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Select Plan
            </Link>
            <div className="flex flex-col gap-3 mt-2">
              <span className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Includes a 7-days free trial
              </span>
              <span className="flex items-center  gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Can sell unlimited watches per month
              </span>
            </div>
          </div>

          {/* Gold Plan */}
          <div className="flex flex-col gap-4 p-6 h-80 rounded-xl shadow-md border border-gray-300">
            <h3 className="text-2xl font-semibold">Gold</h3>
            <div className="flex gap-2 items-end">
              <h1 className="text-4xl font-bold">$149</h1>
              <span className="text-sm mb-1 text-gray-500">3 watch / per Month</span>
            </div>
            <Link href={"/seller/add-card"} className="w-full text-center rounded-full py-5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Select Plan
            </Link>
            <div className="flex flex-col gap-3 mt-2">
              <span className="flex items-center text-sm gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Includes a 5-days free trial
              </span>
              <span className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Can sell upto 3 watches per month
              </span>
            </div>
          </div>
        </div>

        {/* Buy Package Section */}
        <div className="w-full  mt-8">
          <div className="flex flex-col gap-4 p-6 rounded-xl shadow-md border border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-semibold">Buy Package</h3>
                <h1 className="text-4xl font-bold mt-2">$99</h1>
              </div>
              <span className="flex items-center gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.059 8.833 19 7"
                    stroke="#14A752"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Buy unlimited watches
              </span>
            </div>
            <Link href={"/seller/add-card"} className="w-full text-center rounded-full py-5 bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
              Select Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;