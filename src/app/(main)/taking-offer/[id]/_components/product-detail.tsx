"use client"
import Badge from '@/components/ui/badge'
import FavBtn from '@/components/ui/fav-btn'
import Image from 'next/image'
import React, { useState } from 'react'
import EmblaCarousel from './ui/carousel/embla-carousel'
import { EmblaOptionsType } from 'embla-carousel'
import { QASkeleton } from '@/components/skeleton'
import Answers from '@/app/(main)/fixed-price/[id]/_components/answers'
import { useGetQuestions } from '@/features/product-qa/hook'
import Questions from '@/app/(main)/fixed-price/[id]/_components/questions'
import { useAddProductToFavorite } from '@/features/fav-product/hook'
import { showSuccess } from '@/lib/toast'
type Props = {
  name?: string;
  price?: number
  product: any
}

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
const ProductDetail = ({ name, price, product }: Props) => {
  const [page, setPage] = useState(1);
  const isAuthenticated = product?.authentication?.status === 'authenticated';

  const { data: productQAndA, isLoading } = useGetQuestions(product?._id, page)

  const { mutate: addProductToFavorite, isPending } = useAddProductToFavorite(product?._id || "");
  const handleAddToFavorite = () => {
    addProductToFavorite(undefined, {
      onSuccess: () => {
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
        <h1 className='text-xl md:text-3xl'>${product?.price} <sub className='mb-4 text-xs'>Starting Price</sub></h1>
      </div>

      <div className='my-4'>
        <EmblaCarousel slides={product?.images ?? []} options={OPTIONS} />
      </div>
      <div>
        <h1 className='font-semibold'>Contents</h1>
        {product?.description}
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