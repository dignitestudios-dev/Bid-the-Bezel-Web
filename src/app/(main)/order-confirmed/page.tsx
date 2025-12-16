"use client";
import { Button } from "@/components/ui/button";
import { ReceiptText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="flex flex-col items-center gap-8 w-[30%]" >
        <Image src={"/images/box.png"} alt="box" width={200} height={200} />
        <div>
          <h1 className="text-2xl font-semibold">Order Confirmed</h1>
          <p className="text-xs">Authenticity Check Underway</p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ReceiptText size={10} /> Download Reciept
        </div>
        <Link href={"/"} className="w-full">
          <Button className="w-full text-xs ">Back To Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default page;
