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

type Props = {
  id:string
};

const SingleProduct = ({id}: Props) => {
  const router = useRouter();
  const watch = getWatchById(id)
  if(watch?.saleType !== "auction") return null
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

      <div className="flex lg:flex-row flex-col justify-between gap-4" >
        <ProductDetail name={watch?.name} price={watch && displayPrice(watch)} />
        <BiddingDetail watch={ watch!} sellerId={watch?.sellerId}/>
      </div>
    </div>
  );
};

export default SingleProduct;
