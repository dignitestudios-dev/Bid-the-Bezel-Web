"use client"
import React, { use, useEffect } from 'react'
import SingleProduct from './_components/single-product'
import { useGetMyListingDetail } from '@/features/listing/hook'
import { ProductDetailSkeleton } from '@/components/skeleton'
import { useRouter } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
}

const Page = ({ params }: Props) => {
  const { id } = use(params)
  const router = useRouter()
  const { data, isLoading } = useGetMyListingDetail(id)

  useEffect(() => {
    if (!data?.data?._id) return; // ensure real data loaded

    const shouldRedirect = data?.data?.isDraftPageShown
    console.log("isDraftPageShown:", data?.data?.isDraftPageShown);
    if (shouldRedirect) {
      router.replace(`/seller/shipping-details-auth/${id}`);
    }
  }, [data, id, router]);


  return (
    <div>
      {isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        <SingleProduct id={id} productData={data?.data} />
      )}
    </div>
  )
}

export default Page