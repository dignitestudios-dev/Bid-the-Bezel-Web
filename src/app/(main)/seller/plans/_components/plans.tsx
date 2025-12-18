"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState } from 'react'


type Props = {
      // setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;\
}
const Plans = ({}: Props) => {
  return (
    <div>
        <div className='text-center py-12'>
            <h1 className='text-2xl uppercase font-semibold'>our plans</h1>
            <p className='text-sm'>Browse our three subscription tiers to find the perfect plan for selling your timepieces.</p>
        </div>
         <div className="space-y-4 px-8 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">Basic</h3>
            <div className="flex items-center gap-3 mt-4">
              <p className="text-3xl font-bold">$99</p>
              <p className="text-sm text-gray-600">1 watch / per Month</p>
            </div>

            <Link href={"add-card"} className='w-full mt-4' >
            <Button
              // onClick={() =>setCurrentStep("plan-selected")}
              className=" w-full rounded-full bg-[#0f1b23] text-white"
            >
              Select Plan
            </Button>
            </Link>
            <div className="mt-4 space-y-2">
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

          <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <h3 className="text-2xl font-bold">Gold</h3>

            <div className="flex items-center gap-3 mt-4">
              <p className="text-3xl font-bold">$149</p>
              <p className="text-sm text-gray-600">3 watch / per Month</p>
            </div>
               <Link href={"add-card"} className='w-full mt-4' >
            <Button
              // onClick={() =>setCurrentStep("plan-selected")}
              className=" w-full rounded-full bg-[#0f1b23] text-white"
            >
              Select Plan
            </Button>
            </Link>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Includes a 3-days free trial</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Can sell upto 3 watches per month</span>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition relative">
          <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </div>
          <h3 className="text-2xl font-bold">Executive</h3>

          <div className="flex items-center gap-3 mt-4">
            <p className="text-3xl font-bold">$199</p>
            <p className="text-sm text-gray-600">
              Unlimited watches / per Month
            </p>
          </div>

           <Link href={"add-card"} className='w-full mt-4' >
            <Button
              // onClick={() =>setCurrentStep("plan-selected")}
              className=" w-full rounded-full bg-[#0f1b23] text-white"
            >
              Select Plan
            </Button>
            </Link>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Includes a 3-days free trial</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="text-green-600">✓</span>
              <span>Can sell unlimited watches per month</span>
            </div>
          </div>
        </div>

        </div>

       
        <div className="p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition relative">
          <div className="w-full grid grid-cols-2 ">
            <div>
              <h3 className="text-2xl font-bold">Buy Package</h3>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-3xl font-bold">$99</p>
                <p className="text-sm text-gray-600">1000 Bids / per Month</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>1000 Bids</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-green-600">✓</span>
                <span>Other Options</span>
              </div>
            </div>
          </div>

            <Link href={"add-card"} className='w-full mt-4' >
            <Button
              // onClick={() =>setCurrentStep("plan-selected")}
              className=" w-full rounded-full bg-[#0f1b23] text-white"
            >
              Select Plan
            </Button>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Plans