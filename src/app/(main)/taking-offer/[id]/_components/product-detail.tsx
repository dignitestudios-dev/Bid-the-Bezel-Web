"use client"
import Badge from '@/components/ui/badge'
import FavBtn from '@/components/ui/fav-btn'
import Image from 'next/image'
import React, { useState } from 'react'
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import Questions from '@/app/(main)/fixed-price/[id]/_components/questions'
import { QASkeleton } from '@/components/skeleton'
import Answers from '@/app/(main)/fixed-price/[id]/_components/answers'
import { useGetQuestions } from '@/features/product-qa/hook'
import { useAddProductToFavorite } from '@/features/fav-product/hook'
import { showSuccess } from '@/lib/toast'
import { useGetProductBids } from '@/features/bidding/hooks'


type Props = {
  product: AuctionProduct;
}

const OPTIONS: EmblaOptionsType = {}

const ProductDetail = ({ product }: Props) => {
    const { data: bidsData , isLoading:bidsLoading } = useGetProductBids(product?._id,1 , 10);
  const isAuthenticated = product?.authentication?.status === 'authenticated';
  const [page, setPage] = useState(1);
  const { data: productQAndA, isLoading } = useGetQuestions(product?._id, page)
  const [isFav, setIsFav] = useState(product?.isFavorite);

  const { mutate: addProductToFavorite, isPending } = useAddProductToFavorite(product?._id || "");
  const handleAddToFavorite = () => {
    addProductToFavorite(undefined, {
      onSuccess: () => {
        setIsFav((prev: boolean) => !prev);
        showSuccess(
          product?.isFavorite
            ? "Product removed from favorites"
            : "Product added to favorites"
        );

      },
    });
  };
  const pagination = productQAndA?.pagination
  return (
    <div className='lg:w-[60%] space-y-8'>
      <div>
        <div className='flex justify-between'>
          <h1 className='flex gap-2 items-start text-xl md:text-3xl font-semibold'>
            {product?.model}
            {isAuthenticated && (
              <Badge title='Authenticated' className='bg-linear-to-r text-background text-center from-[#0D1B2A] to-[#415A77]' />
            )}
          </h1>
          <button
            disabled={isPending}
            onClick={handleAddToFavorite}
            className='cursor-pointer '
          >
            <div className="pointer-events-none">
              <FavBtn isFav={product?.isFavorite} />
            </div>
          </button>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-xl md:text-3xl'>${product?.price} <span className='text-base'>Starting Price</span></h1>
          <h1 className='text-xl md:text-3xl'>${bidsData?.data?.[0]?.product?.effectivePrice} <span className='text-base'>Effective Price</span></h1>
        </div>
        <p className='text-sm text-gray-500 mt-1'>Ref: {product?.referenceId}</p>
      </div>

      <div className='my-4'>
        <EmblaCarousel slides={product?.images ?? []} options={OPTIONS} />
      </div>

      <div>
        <h1 className='font-semibold'>Description</h1>
        <p>{product?.description}</p>
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
  )
}

export default ProductDetail