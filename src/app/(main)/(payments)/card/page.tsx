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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CardBrands from "@/components/icons/CardBrands";
import CardIcon from "@/components/icons/CardIcon";
import Lock from "@/components/icons/Lock";

const Card = () => {
  const router = useRouter();

  function handleSave() {
    // static UI — simply redirect to payments page
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
                Card Details
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Card Details</h2>

            <div className="flex items-center gap-4 mb-6">
              <CardIcon />
              <div>
                <div className="font-medium">Credit Or Debit Card</div>
                <div className="flex items-center gap-2 mt-1">
                  <CardBrands />
                </div>
              </div>
            </div>

            <div className="rounded-lg border mb-6 overflow-hidden">
              <div className="px-4 py-4 border-b">
                <input
                  placeholder="Bidthebezel"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>

              <div className="px-4 py-4 border-b flex items-center justify-between">
                <input
                  placeholder="Card number"
                  defaultValue="1616161616503"
                  className="w-full bg-transparent outline-none text-sm"
                />
                <div className="ml-3 text-sm text-muted-foreground">
                  <Lock />
                </div>
              </div>

              <div className="grid grid-cols-3 border-b">
                <div className="col-span-2 px-4 py-3 border-r">
                  <input
                    placeholder="MM/YY"
                    defaultValue="2/12"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                <div className="px-4 py-3">
                  <input
                    placeholder="CVV"
                    defaultValue="457"
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              <div className="px-4 py-3">
                <input
                  placeholder="Zip Code"
                  className="w-full bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-6">
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

export default Card;
