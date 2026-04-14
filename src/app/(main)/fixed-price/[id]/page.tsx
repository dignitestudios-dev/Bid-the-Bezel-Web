"use client"
import React, { use } from 'react'
import SingleProduct from './_components/single-product'
import { useGetMyListingDetail } from '@/features/listing/hook'

type Props = {
  params: Promise<{ id: string }>
}

const Page = ({ params }: Props) => {
  const { id } = use(params)
  const { data } = useGetMyListingDetail(id)

  console.log(data)
  return (
    <div><SingleProduct id={id} productData={data?.data} /></div>
  )
}

export default Page