"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Bank = () => {
  const router = useRouter();

  function handleSave() {
    // static — redirect to payments page
    router.push("/profile/payments");
  }

  return (
    <div className="h-screen p-10">
      <div className="flex items-center gap-4 mb-10">
        <Link
          href="/profile/payments"
          className="text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft />
        </Link>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/profile/payments">Profile</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Bank Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Bank Details</h2>

            <div className="mb-4">
              <label className="block font-medium mb-2">Select Bank</label>
              <Select>
                <SelectTrigger className="w-full h-12!">
                  <SelectValue placeholder="--- Select a Bank ---" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>US Banks</SelectLabel>
                    <SelectItem value="metro">Metro Bank</SelectItem>
                    <SelectItem value="chase">Chase Bank</SelectItem>
                    <SelectItem value="boa">Bank of America</SelectItem>
                    <SelectItem value="wells">Wells Fargo</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg my-4 space-y-4">
              <div>
                <label className="block font-medium mb-2">
                  Account Holder Name
                </label>
                <div className="">
                  <input
                    placeholder="Bid the bezel"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Branch Code</label>
                  <input
                    placeholder="0215"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">
                    Account Number
                  </label>
                  <input
                    placeholder="121154125412"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white outline-none "
                  />
                </div>
              </div>
            </div>

            <p className=" text-muted-foreground mb-6 text-sm">
              By Adding this information you agree to our{" "}
              <Link href="#" className="underline text-primary">
                T&Cs
              </Link>{" "}
              regarding topping up your bank account.
            </p>

            <div>
              <Button onClick={handleSave} size={"lg"} className="w-full h-12">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bank;
