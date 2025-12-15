import React from "react";

type Props = {};

const Plans = (props: Props) => {
  return (
    <div className="p-12 max-w-screen-2xl mx-auto">
      <div className="flex flex-col gap-6 items-center">
        <h1 className="uppercase text-3xl font-semibold">our plans</h1>
        <p className="text-sm text-center">
          Browse our three subscription tiers to find the perfect plan for
          selling your timepieces.
        </p>
        <div className="flex flex-wrap items-center">
          <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md border border-gray-400">
            <h3 className="text-xl font-semibold">Basic</h3>
            <div className="flex gap-2 items-end">
              <h1 className="text-2xl font-semibold">$99</h1>
              <span className="text-xs mb-1 opacity-50">1 watch / per Month</span>
            </div>
            <button className="w-full rounded-full p-3 bg-foreground text-white text-xs">
              Select Plan
            </button>
            <span className="flex items-center text-sm gap-4" >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
            <span className="flex items-center text-sm gap-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
      </div>
    </div>
  );
};

export default Plans;
