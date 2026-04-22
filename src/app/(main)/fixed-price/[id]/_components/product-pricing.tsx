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

const ProductPricing = ({ price, watch }: Props) => {
  const [isFav, setIsFav] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  console.log(watch, "price")
  return (
    <div className="w-[40%] space-y-7">
      {/* <CurrentBid/>
      <TopBids/> */}
      {(watch?.authentication?.status === "pending" ||
        watch?.authentication?.status === "rejected") && (
          <div
            className={`${watch?.authentication?.status === "pending"
              ? "bg-orange-200 text-orange-800"
              : "bg-red-200 text-red-800"
              } text-[14px] w-[120px] rounded-lg p-2 text-center`}
          >
            {watch?.authentication?.status === "pending"
              ? "In Review"
              : "Rejected"}
          </div>
        )}
      <div>
        <div className="flex justify-between">
          <h1 className="flex gap-2 text-3xl font-semibold">{watch?.model}</h1>
          <FavBtn isFav={isFav} setIsFav={setIsFav} />
        </div>
        {watch?.authentication?.status === "approved" && (

          <Badge
            title={"Authenticated"}
            className="bg-linear-to-r w-fit text-background text-center from-[#0D1B2A] to-[#415A77]"
          />
        )}
        <h1 className="text-3xl pt-2">${price}</h1>

        {watch?.buyer && (
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
        )}
      </div>
      {!watch?.isMyProduct && (
        <div>
          {/* href={`/buy-now/${watch?._id}`} */}
          {/* <Link > */}
          <Button className="w-full ">Buy Now</Button>
          {/* </Link> */}
        </div>

      )}
      {/* {user?.id == sellerId ? (
        
      ) : (
      )} */}

      {watch?.authentication?.status === "approved" ? <AuthStatus /> : <UnAuthStatus />}
      <Reviews />
    </div>
  );
};

export default ProductPricing;
