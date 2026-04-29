"use client"
import  { use } from "react";
import SingleProduct from "./_components/single-product";
import { useGetMyListingDetail } from "@/features/listing/hook";
import { ProductDetailSkeleton } from "@/components/skeleton";
type Props = {
  params: Promise<{ id: string }>;
};

const Page = ({ params }: Props) => {
  const { id } = use(params);
    const { data, isLoading } = useGetMyListingDetail(id);


  return (
    <div>
       {isLoading ? (
            <ProductDetailSkeleton />
          ) : (
            <SingleProduct id={id} productData={data?.data} />
          )}
    </div>
  );
};

export default Page;
