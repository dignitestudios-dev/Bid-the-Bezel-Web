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
        <div className="p-4 border-t border-dashed">
          <Button
            className="w-full"
            onClick={() => router.push(`/seller/shipping-details-auth/${id}`)}
          >
            Fill Shipping Details
          </Button>
        </div>
      )}

      {status === "rejected" && (
        <div className="p-4 border-t border-dashed bg-red-50/50 flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => setDeleteDialog(true)}
          >
            Delete Product
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-xs sm:text-sm px-2"
            onClick={() => setUnAuthenticateDialog(true)}
          >
            Continue Without Authentication
          </Button>
        </div>
      )}

      {status === "active" && (
        <div className="p-4 border-t border-dashed bg-red-50/50 flex flex-col sm:flex-row gap-3">
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => setDeleteDialog(true)}
          >
            Delete Product
          </Button>
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
