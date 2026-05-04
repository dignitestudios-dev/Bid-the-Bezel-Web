"use client";

import Badge from "@/components/ui/badge";
import { useMe } from "@/features/auth/hooks";
import { useAddProductToFavorite } from "@/features/fav-product/hook";
import { mapProductToUI } from "@/lib/mappers/product.mapper";
import { showError, showSuccess } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { formatTimeLeft } from "@/lib/utils/date.utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


const ProductCard = ({
  prod,
  id
}: {
  prod: AuctionProduct | FixedPriceProduct | TakingOfferProduct;
  id: string
}) => {

  if (!prod) return null;
  const router = useRouter()

  const { data: userData } = useMe()
  const product = mapProductToUI(prod);
  const { mutate: addProductToFavorite, isPending } = useAddProductToFavorite(id || "");

  const handleAddToFavorite = () => {
    if (!userData?.data) return showError("Please login to add product to favorites");
    addProductToFavorite(undefined, {
      onSuccess: () => {
        showSuccess(
          prod?.isFavorite
            ? "Product removed from favorites"
            : "Product added to favorites"
        );
      }
    });
  };


  return (
    <Link href={product.route}>
      <div className={cn("flex flex-col h-full text-xs md:text-base p-4 rounded-xl  hover:shadow-lg transition-all", product.isAuction ? "border bg-gray-300/10" : " bg-gray-700/10")}>
        <div className="relative">

          <button
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleAddToFavorite();
            }}
            className={cn(
              "absolute top-3 cursor-pointer right-3 z-10 w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-gray-300/20 backdrop-blur-md shadow-md transition-all duration-300"
            )}
          >
            <div className="relative flex items-center justify-center">

              {/* ❤️ Heart */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={1}
                fill={prod?.isFavorite ? "red" : "none"}
                className={cn(
                  "w-7 h-7 transition-all duration-300",
                  prod?.isFavorite && "scale-110"
                )}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.687-4.5-1.935 0-3.597 1.126-4.313 2.733-.716-1.607-2.378-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>


              {isPending && (
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-red-400 opacity-75 animate-ping"></span>
              )}

            </div>
          </button>

          {/* Image */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="pt-4">

          {/* Title + Badge */}
          <h1 className="flex items-center gap-2">
            <span className="font-semibold text-lg">
              {product.title}
            </span>

            {product.isAuthenticated && (
              <Badge
                className="bg-linear-to-r from-[#0D1B2A] to-[#415A77] text-white py-1 px-4 text-sm"
                title="Authenticated"
              />
            )}
          </h1>

          {/* PRICE + AUCTION INFO */}
          <div className="flex text-center items-center w-full justify-between pt-2">

            {/* Price */}
            <div className="w-1/3">
              <h2 className="font-thin">{product.isAuction ? "Starting Price" : ""}</h2>
              <h1 className={cn("font-semibold", product.isAuction ? "text-center" : "text-start")}>
                ${product.price}
              </h1>
            </div>

            {product.isAuction && (
              <>
                <div className="h-10 w-px bg-white/50" />
                <div className="w-1/3">
                  <h2 className="font-thin">Current Bid</h2>
                  <h1 className="font-semibold">
                    ${product.currentBid}
                  </h1>
                </div>

                <div className="h-10 w-px bg-white/50" />

                {/* Ends In */}
                <div className="w-1/3">
                  <h2 className="font-thin">Ends In</h2>
                  <h1 className="font-semibold">
                    {formatTimeLeft(product.endsAt)}
                  </h1>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;