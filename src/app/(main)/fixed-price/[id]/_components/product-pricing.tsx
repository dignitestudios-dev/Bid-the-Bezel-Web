"use client";
import React, { useState } from "react";
import CurrentBid from "./current-bid";
import TopBids from "./top-bids";
import AuthStatus from "./auth-status";
import Reviews from "./reviews";
import FavBtn from "@/components/ui/fav-btn";
import Badge from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import UnAuthStatus from "@/app/(main)/auction/[id]/_components/unauth-status";

type Props = {
  sellerId?: string;
  price?: number;
  name?: string;
  watch: any;
};

const ProductPricing = ({ sellerId, name, price, watch }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="w-[40%] space-y-7">
      {/* <CurrentBid/>
      <TopBids/> */}
      {user?.id == sellerId ? (
        <div>
          <div className="flex justify-between">
            <h1 className="flex gap-2 text-3xl font-semibold">{name}</h1>
            {/* <FavBtn isFav={isFav} setIsFav={setIsFav} /> */}
          </div>
          <Badge
            title="Authenticated"
            className="bg-linear-to-r w-fit text-background text-center from-[#0D1B2A] to-[#415A77]"
          />
          <h1 className="text-3xl pt-2">${price}.00</h1>
          {/* <Link href={"/buy-now"}>
          <Button className="w-full my-6">Buy Now</Button>
        </Link> */}

          <div className=" border  rounded-2xl mt-4">
            <div className="flex justify-between p-5 pb-0">
              <h3 className="font-semibold">Buyer</h3>{" "}
            </div>
            <div className="flex border-b items-center p-5 gap-3">
              <Image src={"/images/dp.png"} alt="al" width={60} height={60} />
              <div>
                <h1 className="font-semibold mb-2">GuessMyname</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 w-full">
              <Link href={"/chats"} className="w-full">
                <Button className="py-2 w-full h-12 text-base bg-[#F7F7F7] hover:bg-[#f8f3f3] text-primary hover:text-primary flex justify-center gap-2">
                  {" "}
                  <MessageCircleMore size={25} />
                  Chat with Buyer
                </Button>
              </Link>

              <Link href={"/buyer/shipping-details"} className="w-full">
                <Button className="text-base w-full">Fill out Shipping</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between">
            <h1 className="flex gap-2 text-3xl font-semibold">{name}</h1>
            <FavBtn isFav={isFav} setIsFav={setIsFav} />
          </div>
          <Badge
            title="Authenticated"
            className="bg-linear-to-r w-fit text-background text-center from-[#0D1B2A] to-[#415A77]"
          />
          <h1 className="text-3xl pt-2">${price} </h1>
          <Link href={`/buy-now/${watch?.watchId}`}>
            <Button className="w-full my-6">Buy Now</Button>
          </Link>
        </div>
      )}

      {watch.isAuthenticated ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews />
    </div>
  );
};

export default ProductPricing;
