"use client";

import Badge from "@/components/ui/badge";
import FavBtn from "@/components/ui/fav-btn";
import Image from "next/image";
import React, { useState } from "react";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import Questions from "@/app/(main)/fixed-price/[id]/_components/questions";
import { QASkeleton } from "@/components/skeleton";
import Answers from "@/app/(main)/fixed-price/[id]/_components/answers";
import { useGetQuestions } from "@/features/product-qa/hook";
import { useAddProductToFavorite } from "@/features/fav-product/hook";
import { showError, showSuccess } from "@/lib/toast";
import { useGetProductBids } from "@/features/bidding/hooks";
import { useMe } from "@/features/auth/hooks";
import { formatPrice } from "@/lib/helper";

type Props = {
  product: AuctionProduct;
};

const OPTIONS: EmblaOptionsType = {};

const ProductDetail = ({ product }: Props) => {
  const { data: userData } = useMe();

  const { data: bidsData, isLoading: bidsLoading } = useGetProductBids(
    product?._id,
    1,
    10
  );

  const isAuthenticated =
    product?.authentication?.status === "authenticated";

  const [page, setPage] = useState(1);
  const { data: productQAndA, isLoading } = useGetQuestions(
    product?._id,
    page
  );

  // ✅ ONLY FAVORITE STATE CHANGE
  const [isFav, setIsFav] = useState(product?.isFavorite);

  const { mutate: addProductToFavorite, isPending } =
    useAddProductToFavorite(product?._id || "");

  const handleAddToFavorite = () => {
    if (!userData?.data)
      return showError("Please login to add product to favorites");

    const previous = isFav;

    // optimistic update (instant UI change)
    setIsFav(!previous);

    addProductToFavorite(undefined, {
      onSuccess: () => {
        showSuccess(
          previous
            ? "Product removed from favorites"
            : "Product added to favorites"
        );
      },
      onError: () => {
        // rollback if API fails
        setIsFav(previous);
        showError("Something went wrong");
      }
    });
  };

  const pagination = productQAndA?.pagination;

  return (
    <div className="lg:w-[60%] space-y-8">
      <div>
        <div className="flex justify-between">
          <h1 className="flex gap-2 items-start break-all text-xl md:text-3xl font-semibold">
            {product?.brandName} {product?.model}

            {isAuthenticated && (
              <Badge
                title="Authenticated"
                className="bg-linear-to-r text-background text-center from-[#0D1B2A] to-[#415A77]"
              />
            )}
          </h1>

          {/* ✅ ONLY CHANGE HERE */}
       { !product.isMyProduct &&  <button
            disabled={isPending}
            onClick={handleAddToFavorite}
            className="cursor-pointer"
          >
            <div className="pointer-events-none">
              <FavBtn isFav={isFav} />
            </div>
          </button>}
        </div>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl md:text-3xl">
            {formatPrice(product?.price)}{" "}
            <span className="text-base">Starting Price</span>
          </h1>
          {product.isReserved && product.isMyProduct &&(
            <h1 className="text-xl md:text-3xl">
            {formatPrice(product?.reservePrice)}{" "}
            <span className="text-base">Reserved Price</span>
          </h1>
          ) }
          
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Ref: {product?.referenceId}
        </p>
      </div>

      <div className="my-4">
        <EmblaCarousel slides={product?.images ?? []} options={OPTIONS} />
      </div>

      <div>
        <h1 className="font-semibold">Description</h1>
        <p className="wrap-break-word">{product?.description}</p>
      </div>

      {isLoading ? (
        <QASkeleton />
      ) : product?.isMyProduct ? (
        <Answers
          productQAndA={productQAndA?.data}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      ) : (
        <Questions
          id={product?._id}
          productQAndA={productQAndA?.data}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default ProductDetail;