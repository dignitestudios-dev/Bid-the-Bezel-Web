"use client";

import { useParams, useRouter } from "next/navigation";
import BuyNow from "../_components/buy-now";
import { useEffect } from "react";
import { useGetMyListingDetail } from "@/features/listing/hook";

const Page = () => {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const { data, isLoading } = useGetMyListingDetail(id);

  useEffect(() => {
    if (!isLoading && data?.data?.status === "sold") {
      router.replace("/");
    }
  }, [data?.data, isLoading, router]);




  return (
    <div className="max-w-screen-2xl p-2 mx-auto">
      <BuyNow productData={data} />
    </div>
  );
};

export default Page;