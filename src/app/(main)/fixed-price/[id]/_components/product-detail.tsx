"use client";
import EmblaCarousel from "./ui/carousel/embla-carousel";
import { EmblaOptionsType } from "embla-carousel";
import Questions from "./questions";
import Answers from "./answers";
import { useGetQuestions } from "@/features/product-qa/hook";
import { useState } from "react";
import { QASkeleton } from "@/components/skeleton";
type Props = {
  productData: any;
};

const OPTIONS: EmblaOptionsType = {};

const ProductDetail = ({ productData }: Props) => {
  const slides = productData?.images ?? [];
  const [page, setPage] = useState(1);
  const { data: productQAndA, isLoading } = useGetQuestions(
    productData?._id,
    page,
  );
  const pagination = productQAndA?.pagination;

  return (
    <div className="w-full lg:w-[60%] space-y-8">
      <div className="my-4">
        {slides.length > 0 ? (
          <EmblaCarousel slides={slides} options={OPTIONS} />
        ) : (
          <div className="h-[500px] bg-gray-100 rounded-lg animate-pulse" />
        )}
      </div>
      <div>
        <h1 className="font-semibold wrap-break-word">Description</h1>
        {productData?.description}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Year */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <h2 className="text-sm text-gray-500 mb-1">
            Purchase year of the Watch
          </h2>

          <p className="font-semibold text-base">
            {productData?.purchaseYear
              ? new Date(productData.purchaseYear).getFullYear()
              : "N/A"}
          </p>
        </div>

        {/* Watch Condition */}
        <div className="border rounded-xl p-4 bg-gray-50">
          <h2 className="text-sm text-gray-500 mb-1">Condition of the Watch</h2>

          <p className="font-semibold text-base">
            {productData?.watchCondition || "N/A"}
          </p>
        </div>
      </div>
      {isLoading ? (
        <QASkeleton />
      ) : productData?.isMyProduct ? (
        <Answers
          productQAndA={productQAndA?.data}
          page={page}
          setPage={setPage}
          pagination={pagination}
        />
      ) : (
        <Questions
          id={productData?._id}
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
