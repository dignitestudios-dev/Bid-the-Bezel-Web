"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumbs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import ProductDetail from "./product-detail";
import BiddingDetail from "./bidding-detail";
import { displayPrice, getWatchById } from "@/lib/helper";
import { useGetMyListingDetail } from "@/features/listing/hook";
import { ProductDetailSkeleton } from "@/components/skeleton";

type Props = {
  id: string;

};

const SingleProduct = ({ id }: Props) => {
  const router = useRouter();
  const { data, isLoading } = useGetMyListingDetail(id);
  console.log("data", data);

  const watch = getWatchById(id);
  // if (watch?.saleType !== "taking-offer") return null;
  return (
    <div className="max-w-screen-2xl mx-auto w-[90%] py-12">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={18} />
              </button>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold cursor-pointer">
              Product Details
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {isLoading ?
        <ProductDetailSkeleton />
        :
        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <ProductDetail
            product={data?.data}

          />
          <BiddingDetail watch={data?.data} sellerId={data?.data?.seller?._id} />
        </div>
      }
    </div>
  );
};

export default SingleProduct;
