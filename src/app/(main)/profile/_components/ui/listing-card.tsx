"use client";
import { Button } from "@/components/ui/button";
import { useUnAuthenticate } from "@/features/products/hook";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AlertUnauthenticatedDialog } from "./alert-unauthenticated-dialog";
import { AlertDeleteDialog } from "./alert-delete-dialog";
import Link from "next/link";

type Props = {
  link?: string;
  image: string;
  title: string;
  price: string;
  type: string;
  status: string;
  isDraftShown: boolean;
  brandName: string;
  id: string;
};

const ListingCard = ({
  image,
  title,
  price,
  type,
  status,
  isDraftShown,
  brandName,
  id,
}: Props) => {
  const router = useRouter();
  const [unAuthenticateDialog, setUnAuthenticateDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  return (
    <div className="card p-0 relative overflow-hidden">
      {status == "pending" ? (
        <Link
          href={`/fixed-price/${id}`}
          className="p-3 w-full flex items-start gap-3"
        >
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
            <Image
              src={image}
              alt={title}
              width={96}
              height={96}
              unoptimized
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex-1">
            <p className="text-lg font-semibold text-end">${price}</p>
            <p className="text-lg font-medium">{brandName}</p>
          </div>
        </Link>
      ) : (
        <div className="p-3 w-full flex items-start gap-3">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 shrink-0">
            <Image
              src={image}
              alt={title}
              width={96}
              height={96}
              unoptimized
              className="object-contain w-full h-full"
            />
          </div>

          <div className="flex-1">
            <p className="text-lg font-semibold text-end">${price}</p>
            <p className="text-lg font-medium">{brandName}</p>
          </div>
        </div>
      )}

      {!isDraftShown && status === "draft" && (
        <div className="p-3 grid grid-cols-2 gap-5">
          <span></span>
          <Button
            onClick={() => router.push(`/seller/shipping-details-auth/${id}`)}
          >
            {/* <Link href={`/buyer/shipping-details/${product?._id}`} className="w-full"> */}
            Fill Shipping Details
            {/* </Link> */}
          </Button>
        </div>
      )}
      {status === "rejected" && (
        <div className="flex">
          <div className="p-3 w-full gap-5">
            <span></span>
            <Button
              onClick={() => setDeleteDialog(true)}
              className="border bg-white hover:bg-red-600 hover:text-white border-gray-200 text-red-600"
            >
              {/* <Link href={`/buyer/shipping-details/${product?._id}`} className="w-full"> */}
              Delete Product
              {/* </Link> */}
            </Button>
          </div>
          <div className="p-3 w-full gap-5">
            <span></span>
            <Button onClick={() => setUnAuthenticateDialog(true)}>
              {/* <Link href={`/buyer/shipping-details/${product?._id}`} className="w-full"> */}
              Continue Without Authentication
              {/* </Link> */}
            </Button>
          </div>
        </div>
      )}

      <div
        className={`p-3 text-white font-medium text-center  ${
          type === "auction"
            ? "bg-[#415A77]"
            : type === "fixed_price"
              ? "bg-[#778DA9]"
              : "bg-[#D9B918]"
        }`}
      >
        {type === "auction"
          ? "Auction"
          : type === "fixed_price"
            ? "Fixed Price"
            : "Taking Offers"}
      </div>
      <AlertUnauthenticatedDialog
        id={id}
        open={unAuthenticateDialog}
        setOpen={setUnAuthenticateDialog}
      />
      <AlertDeleteDialog
        id={id}
        open={deleteDialog}
        setOpen={setDeleteDialog}
      />
    </div>
  );
};

export default ListingCard;
