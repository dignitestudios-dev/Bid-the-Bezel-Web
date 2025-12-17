"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumbs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

const Card = () => {
  const router = useRouter();

  function handleSave() {
    // static UI — simply redirect to payments page
    router.push("/profile/payments");
  }

  return (
    <div className="min-h-[70vh] py-8">
      <div className="container mx-auto px-6">
        <div className="mb-6 flex items-center gap-4">
          <a href="#" className="text-2xl leading-none">
            ←
          </a>
          <Breadcrumb aria-label="breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Bank Details</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Card Details</h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                💳
              </div>
              <div>
                <div className="font-medium">Credit Or Debit Card</div>
                <div className="flex items-center gap-2 mt-1">
                  <img src="/images/visa.png" alt="visa" className="h-6" />
                  <img src="/images/mastercard.png" alt="mc" className="h-4" />
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4 mb-6">
              <div className="mb-3">
                <input
                  placeholder="Bidthebezel"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1 text-sm">1616161616503</div>
                  <div className="text-sm">🔒</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="col-span-2">
                  <div className="text-sm">2/12</div>
                </div>
                <div>
                  <div className="text-sm">457</div>
                </div>
              </div>

              <div>
                <input
                  placeholder="Zip Code"
                  className="w-full bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Select Bank
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>US Banks</SelectLabel>
                    <SelectItem value="chase">Chase Bank</SelectItem>
                    <SelectItem value="boa">Bank of America</SelectItem>
                    <SelectItem value="wells">Wells Fargo</SelectItem>
                    <SelectItem value="citi">Citi Bank</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSave}
                className="w-full h-12 rounded-full bg-[#0f1724] text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
